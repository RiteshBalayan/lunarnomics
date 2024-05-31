#!/bin/sh

source venv/bin/activate

python3 manage.py collectstatic && gunicorn --workers 2 lunarnomics.wsgi