<?php

namespace Database\Seeders;

use App\Models\TaskStatus;
use Illuminate\Database\Seeder;

class TaskStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TaskStatus::create(['name' => "Não Concluída"]);
        TaskStatus::create(['name' => "Em Progresso"]);
        TaskStatus::create(['name' => "Concluída"]);
    }
}
