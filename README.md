## Task Manager

Requisitos: PHP ^8.1, composer, MySQL e Laravel ^10

### Configuração

Faça uma cópia do arquivo .env.example: Execute o seguinte comando para criar uma cópia do arquivo .env.example e renomeá-lo para .env:

cp .env.example .env e aplique as configurações abaixo

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=crud_laravel
    DB_USERNAME=root
    DB_PASSWORD=

Certifique-se de que essas informações sejam correspondentes às suas configurações locais.

### `Configuração do composer, Migration e Seed`

Instale as dependências do projeto usando o Composer:

    composer install

Execute as migrações para criar as tabelas no banco de dados e executar os seeds:

    php artisan migrate --seed

### `Executar o projecto`
Gere uma chave de aplicação única usando o comando:

    php artisan key:generate

Inicie o servidor local para executar a aplicação Laravel:

    php artisan serve --port:8000

Acesse o projecto apartir de: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

    Use as seguintes credenciais para entrar no sistema

    email: admin@crud.com
    password: admin