<?php

namespace App\Services;

use App\Repositories\TaskRepository;
use App\Repositories\TaskStatusRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskService
{
    private $repository;
    private $status_repository;

    public function __construct(TaskRepository $_repository, TaskStatusRepository $_status_repository)
    {
        $this->repository = $_repository;
        $this->status_repository = $_status_repository;
    }

    public function get($id)
    {
        $res = $this->repository->get($id);

        if ($res) {
            return response()->json(['success' => true, 'data' => $res], 200);
        }
        return response()->json(['message' => 'Data not found'], 404);
    }

    public function getAll(Request $request)
    {
        $filters = [];

        if ($request->input('status') != null) {
            $filters['status_id'] = (int)$request->input('status');
        }

        $res = $this->repository->list($filters);

        if ($res) {
            return response()->json(['success' => true, 'data' => $res], 200);
        }
        return response()->json(['message' => 'Data not found'], 404);
    }

    public function store(Request $request)
    {
        if ($request->isJson()) {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string',
                'description' => 'string',
                'users' => 'required|string',
                'status_id' => 'integer'
            ], [
                'title' => 'Titulo inválido!',
                'description' => 'Descrição inválido!',
                'users' => 'Usuário inválido!',
                'status_id' => 'Status inválido!',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            $task = $this->repository->store($validator->validated());

            if (!$task) {
                return response()->json([
                    'message' => 'Bad Request',
                ], 400);
            }

            $task->users()->sync(explode(',', $request->input('users')));

            return response()->json([
                'success' => true,
                'task' => $task
            ], 201);
        }

        return response()->json(['message' => 'Please, send a valid Json Request'], 400, []);
    }

    public function update($id, Request $request)
    {
        if ($request->isJson()) {
            $task = $this->repository->get($id);

            if (!$task) {
                return response()->json(['message' => 'Task not found'], 404);
            }

            $validator = Validator::make($request->all(), [
                'title' => 'required|string',
                'description' => 'string',
                'users' => 'required|string',
                'status_id' => 'integer'
            ], [
                'title' => 'Titulo inválido!',
                'description' => 'Descrição inválido!',
                'users' => 'Usuário inválido!',
                'status_id' => 'Status inválido!',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            $update = $this->repository->update($id, $validator->validated());

            if (!$update) {
                return response()->json([
                    'message' => 'Bad Request',
                ], 400);
            }

            $users = explode(',', $request->input('users'));

            if (count($users) > 0) {
                $task->users()->sync($users);
            }

            return response()->json([
                'success' => true
            ], 201);
        }

        return response()->json(['message' => 'Please, send a valid Json Request'], 400, []);
    }

    public function delete($id)
    {
        $res = $this->repository->delete($id);
        if ($res) {
            return response()->json(['success' => $res], 200);
        }
        return response()->json(['message' => 'Task not found'], 404);
    }

    public function getStatuses()
    {
        $res = $this->status_repository->list();

        if ($res) {
            return response()->json([
                'success' => true, 
                'data' => $res,
            ], 200);
        }
        return response()->json(['message' => 'Data not found', 'dt'=>$res], 404);
    }
}
