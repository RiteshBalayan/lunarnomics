#!/bin/bash

source venv/bin/activate

ls

python3 manage.py collectstatic && gunicorn --workers 2 lunarnomics.wsgi