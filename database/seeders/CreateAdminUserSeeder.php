<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class CreateAdminUserSeeder extends Seeder
{
    /**

     * Run the database seeds.

     *

     * @return void
     * php artisan db:seed --class=CreateAdminUserSeeder
     * 
     */

    public function run()
    {
        $email = 'admin@crud.com';
        $exists = User::where('email', $email)->first();
        if(!$exists) {
            // permissions for role admin
            $adminRole = Role::create(['name' => 'Administrador']);
            $permissions = Permission::pluck('id','id')->all();
            $adminRole->syncPermissions($permissions);

            // permissions for role users ['list', 'create', 'edit', 'view']
            $normalUsers = Role::create(['name' => 'Usuário']);
            $normalUsers->givePermissionTo(['list', 'edit', 'view']);

            // user admin
            $user = User::create([
                'name' => 'admin', 
                'email' => $email,
                'password' => 'admin'
            ]);

            $user->assignRole([$adminRole->id]);

            
            // normal users
            $user1 = User::create(['name' => 'Usuário 2', 'email' => 'user2@gmail.com','password' => 'user2']);
            $user2 = User::create(['name' => 'Usuário 3', 'email' => 'user3@gmail.com','password' => 'user3']);
            $user3 = User::create([ 'name' => 'Usuário 4',  'email' => 'user4@gmail.com', 'password' => 'user4']);

            $user1->assignRole([$normalUsers->id]);
            $user2->assignRole([$normalUsers->id]);
            $user3->assignRole([$normalUsers->id]);
        }
    }

}
