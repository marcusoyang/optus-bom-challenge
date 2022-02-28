# Optus BoM Coding Challenge

Web service that returns JSON information regarding Sydney Olympic Park weather forecast information, filtering for 'apparent_t' greater than 20, sorted in ascending order.

Each JSON element contains:
 - name
 - apparent_t
 - lat
 - long

Error message is returned in 'error' key in JSON response if there is any error with BoM.

Application contains a dockerfile.

# Technologies Used
 - Nodejs
 - Express

