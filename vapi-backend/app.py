from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

cd = {}

@app.route('/api/details',methods=['POST'])
def callDetails():
    global cd
    try:
        cd = request.json
        print("=" * 50)
        print(f"CALL DETAILS RECEIVED - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 50)

        print(f"Debate type is : {cd['debatetype']}")
        print(f"username is : {cd['username']}")
        print(f"fromside is : {cd['fromside']}")
        print(f"job is : {cd['job']}")

        return jsonify(cd)
    
    except:
        print("Error in getting the post request from the vapi server")
        return jsonify({"error":"Major error occured from the backend side"}),500

@app.route('/api/details',methods=['GET'])
def sendDetail():
    try:
        return jsonify(cd)
    except:
        print("Error in sending the get request to the frontend ")
        return jsonify({"error":"Major error occured from the frontend side"}),400


@app.route('/')
def root():
    return jsonify({"message": "Vapi Call Details Backend is running"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
