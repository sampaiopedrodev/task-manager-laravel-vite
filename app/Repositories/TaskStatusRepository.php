<?php

namespace App\Repositories;

use App\Models\TaskStatus;

class TaskStatusRepository
{
    private $model;
    public function __construct(TaskStatus $_model)
    {
        $this->model = $_model;
    }

    public function list()
    {
        return $this->model->where('status', '=', 1)->get();
    }
}
