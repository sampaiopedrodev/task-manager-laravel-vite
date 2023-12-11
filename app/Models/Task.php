<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status_id',
        'deleted_at',
    ];

    protected $hidden = ['pivot'];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'task_has_users', 'task_id', 'user_id')->select(['user_id as id', 'name']);
    }
}
