<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
class PermissionTableSeeder extends Seeder
{
       /**

     * Run the database seeds.

     *

     * @return void
     * php artisan db:seed --class=PermissionTableSeeder

     */

    public function run()
    {

        $permissions = [
           'list',
           'create',
           'edit',
           'view',
           'delete',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

    }
}
