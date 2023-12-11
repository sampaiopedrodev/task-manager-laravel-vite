<?php

namespace App\Http\Controllers;

use App\Services\TaskService;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    private $taskService;

    public function __construct(TaskService $_taskService)
    {
        $this->taskService = $_taskService;
    }

    public function store(Request $request)
    {
        return $this->taskService->store($request);
    }

    public function index(Request $request)
    {
        return $this->taskService->getAll($request);
    }

    public function show($id)
    {
        return $this->taskService->get($id);
    }

    public function update($id, Request $request)
    {
        return $this->taskService->update($id, $request);
    }

    public function destroy($id)
    {
        return $this->taskService->delete($id);
    }

    public function getStatuses()
    {
        return $this->taskService->getStatuses();
    }
}
