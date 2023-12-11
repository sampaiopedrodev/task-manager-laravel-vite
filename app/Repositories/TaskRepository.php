<?php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Support\Facades\DB;

class TaskRepository
{
    private $model;
    public function __construct(Task $_model)
    {
        $this->model = $_model;
    }

    public function list($filters)
    {
        $query = $this->model
            ->select('tasks.id', 'tasks.title', 'tasks.description', DB::raw('DATE_FORMAT(tasks.created_at, "%d-%m-%Y") as date'),'status.id as status_id', 'status.name as status_name')
            ->join('task_statuses as status', 'tasks.status_id', '=', 'status.id');

        if (isset($filters['status_id'])) {
            $query->where('status.id', (int)$filters['status_id']);
        }

        $query->whereNull('deleted_at');

        return $query->with(['users'])->get();
    }

    public function get($id)
    {
        $query = $this->model
            ->select('tasks.id', 'tasks.title', 'tasks.description', DB::raw('DATE_FORMAT(tasks.created_at, "%d-%m-%Y") as date'),'status.id as status_id', 'status.name as status_name')
            ->join('task_statuses as status', 'tasks.status_id', '=', 'status.id')
            ->whereNull('deleted_at');

        return $query->with(['users'])->find($id);
    }

    public function store($data)
    {
        return $this->model->create($data);
    }

    public function update($id, $data)
    {
        $d = $this->model->find($id);
        if ($d) {
            return $d->update($data);
        }
        return false;
    }

    public function delete($id)
    {
        return $this->model->find($id)->update(['deleted_at' => now()]);
    }
}
