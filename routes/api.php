<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group([
    'middleware' => 'api',
], function ($router) {
    $router->post('auth/login', [UserController::class, 'login']);

    Route::group([
        'middleware' => ['api', 'auth:api'],
    ], function ($sub_router) {
        // user
        $sub_router->post('auth/logout', [UserController::class, 'logout']);
        $sub_router->post('auth/refresh', [UserController::class, 'refresh']);
        $sub_router->get('auth/me', [UserController::class, 'me']);
        $sub_router->get('auth/users', [UserController::class, 'users']);

        // task
        $sub_router->post('tasks', [TaskController::class,'store']);
        $sub_router->get('tasks', [TaskController::class, 'index']);
        $sub_router->get('tasks/{id}', [TaskController::class,'show']);
        $sub_router->put('tasks/{id}', [TaskController::class, 'update']);
        $sub_router->delete('tasks/{id}', [TaskController::class, 'destroy']);
        $sub_router->get('statuses', [TaskController::class, 'getStatuses']);
    });
});