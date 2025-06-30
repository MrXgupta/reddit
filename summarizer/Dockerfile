FROM python:3.9

WORKDIR /app

RUN pip install torch transformers flask

COPY . .

CMD ["python", "summarizer.py"]
