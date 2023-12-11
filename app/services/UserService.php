<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Validator;

class UserService
{
    private $repository;

    public function __construct(UserRepository $_repository)
    {
        $this->repository = $_repository;
    }

    public function me($id)
    {
        $res = $this->repository->get($id);
        if ($res) {
            $res->permissions = $res->getPermissionsViaRoles()->pluck('name');
            $role =  $res->roles()->first();

            if ($role) {
                $res->role = [
                    'id' => $role->id,
                    'name' => $role->name
                ];
            }

            unset($res->roles);

            return response()->json(['success' => true, 'data' => $res], 200);
        }
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function getUsers()
    {
        $users = $this->repository->list(0);
        return response()->json($users);
    }

    public function get($id, Request $request)
    {
        $data=[];
        $results = $this->repository->get($id);
        if ($results) {
            $data=[
                'id'=>$results->id,
                'name'=>$results->name,
                'email'=>$results->email,
                'status'=>$results->status,
                'permissions'=>[],
                'roles'=>[]
            ];

            foreach($results->roles as $result){
                $data['roles'][]=[
                    'id'=>$result->id,
                    'name'=>$result->name,
                    'checked'=>true
                ];
            }
            foreach($results->permissions as $result){
                $data['permissions'][]=[
                    'id'=>$result->id,
                    'name'=>$result->name,
                    'checked'=>true
                ];
            }

            return response()->json(['success' => true, 'data' => $data], 200);
        }
        return response()->json(['message' => 'Data not found'], 404);
    }

    public function getAll()
    {
        $res = $this->repository->list();
        if ($res) {
            return response()->json(['success' => true, 'data' => $res], 200);
        }
        return response()->json(['message' => 'Data not found'], 404);
    }

    public function getByRoles(Request $request)
    {
        $rolesIds = explode(',', $request->input('roles')) ?? [];
        $res = $this->repository->getByRoles($rolesIds);
        return response()->json(['success' => true, 'data' => $res], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',  
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:4',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $rolesIds = $request->input('roles') ?? [];
        $permissionsIds = $request->input('permissions') ?? [];
        $_user = $this->repository->store($validator->validated());
        if (count($rolesIds) > 0) {
            $_user->roles()->sync($rolesIds);
        }
        if (count($permissionsIds)) {
            $_user->syncPermissions($permissionsIds);
        }
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $_user
        ], 201);
    }

    public function update($id, Request $request)
    {
        if ($request->isJson()) {
            $rolesIds = $request->input('roles') ?? [];
            $permissionsIds = $request->input('permissions') ?? [];
            $res = $this->repository->update($id, $request->all());
            $_user = $this->repository->get($id);
            if (count($rolesIds) > 0) {
                $_user->roles()->sync($rolesIds);
            }
            if (count($permissionsIds) > 0) {
                $_user->syncPermissions($permissionsIds);
            }
            return response()->json(['success' => true, 'data' => $res], 200);
        }
        return response()->json(['message' => 'Please, send a valid Json Request'], 400, []);
    }
    
    //Auth Flow

    public function login(Request $request)
    {
        $validator = Validator::make(request(['email', 'password']), [
            'email' => 'required|email',
            'password' => 'required|string|min:4',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //$credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function userProfile()
    {
        return response()->json(auth()->user());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth('api')->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}
