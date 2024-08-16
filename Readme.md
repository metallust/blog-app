
# - Database setup
```bash
docker compose up
```
1. The above command will start a postgres server which django can connect to later

In setting.py we have the configuration to connect to db
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'blogapp',
        'USER': 'postgres',
        'PASSWORD': 'supersecret',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

```

2. (Optionally) we can connect db via secure way by creating a new user 
```sql
psql -h localhost -p 5432 -U postgres 
-- now create database
-- create user with someassord
-- give all access of that db to new User
```

# -  Backend setup
```bash
# create and activate the venv
python -m venv .venv
# activate
./.venv/Script/activate
# install requirements
pip install -r requirements.txt
# makemigration(optional)
python manage.py makemigration backend
# migrate
python manage.py migrate
```
### Finally start the backend server
```
python manage.py runserver
```


# - Frontend Setup
1. install node modules 
```bash
npm i
```

2. setup
### Create ".env.local" file in frontend/ and add this
```python
VITE_BACKEND_URL="http://localhost:8000"
```
or
```python
VITE_BACKEND_URL="<your_backend_url>"
```

3. run server
```bash
npm run dev
```

In production the frontend file can be build and add in the static folder of django backend and hence we can merge this do seperate application