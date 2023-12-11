<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\DB;
class UserRepository
{
   private $model;
   public function __construct(User $_model)
   {
      $this->model = $_model;
   }

   public function getUsers($exclude_id){
      return DB::select('SELECT * FROM users WHERE id !=? ORDER BY name ASC',[$exclude_id]);
   }

   public function list() {
      return $this->model->all();
   }

   public function getAll() {
      return $this->model->all();
   }

   public function getByRoles($roles) {
     $query = "SELECT id,name FROM users u JOIN model_has_roles uhr ON u.id=uhr.model_id WHERE uhr.role_id IN (4,5,6,7,10)  AND u.status = 1 GROUP BY u.id  ORDER BY name ASC";
     return DB::select($query);
   }

   public function get($id){
      return $this->model->find($id);
   }

   public function getAllPermissions($id){
      return DB::select(" SELECT
      p.id,
      p.name,
      p.guard_name
   FROM 
      `permissions` p 
      LEFT JOIN model_has_permissions mp ON (p.id = mp.permission_id)
   WHERE 
      mp.model_id='".(int)$id."'
   GROUP BY 
      p.id
      ");
   }

   public function getByName($name){
      return $this->model->firstWhere('name', $name);
   }

   public function storeORUpdate($id, $data){
      $d = $this->model->find($id);
      if($d) {
         return $d->update($data);
      } else {
         return $this->model->create($data);
      }
   }

   public function store($data){
      return $this->model->create($data);
   }

   public function update($id, $data){
      $d = $this->model->find($id);
      if($d) {
         return $d->update($data);
      }
      return false;
   }

   public function delete($id){
      return $this->model->find($id)->delete();
   }
}