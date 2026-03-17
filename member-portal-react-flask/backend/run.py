# import requests
# from flask import Flask, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Business Central Credentials
# BC_URL = "http://10.33.34.6:7048/BC220/ODataV4/Company('KIRUNGII')/CustomerService"
# BC_URL = "http://10.33.34.6:7048/BC220/ODataV4/Company('KIRUNGII')/MemberList"
# BC_USERNAME = "KIRNBICLD002\FKIMATHI"
# BC_PASSWORD = "A2Y53l13B7/zHD9xmzX/wrpuM0XdxunoSCBquaDEhSQ="

# @app.route('/api/customers', methods=['GET'])
# def get_customers():
#     try:
#         response = requests.get(
#             BC_URL, 
#             auth=(BC_USERNAME, BC_PASSWORD),
#             headers={"Accept": "application/json"}
#         )
        
#         if response.status_code == 200:
#             return jsonify(response.json())
#         else:
#             return jsonify({"error": "Failed to fetch data"}), response.status_code

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)


from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)

