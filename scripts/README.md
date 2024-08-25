Here's a detailed guide on how to use the CRUD API with the provided `invoke URL`.

---

# **TransMark CRUD API Documentation**

This API allows you to interact with a DynamoDB table for managing comments on transcripts. You can create, read, update, and delete comments associated with specific transcripts.

## **Base URL**
```
https://pde9nag7w2.execute-api.us-east-2.amazonaws.com/prod
```

## **Available Endpoints**

1. **Status Check**
   - **GET /status**
   - **Description:** Checks if the service is running properly.
   - **Response:**
     ```json
     {
       "statusCode": 200,
       "body": "Service is running properly"
     }
     ```

2. **Get a Single Comment**
   - **GET /comment**
   - **Description:** Retrieve a specific comment associated with a transcript.
   - **Query Parameters:**
     - `commentid`: The ID of the comment.
     - `transcriptid`: The ID of the transcript.
   - **Example Request:**
     ```
     GET /comment?commentid=12345&transcriptid=67890
     ```
   - **Response:**
     ```json
     {
       "comment_id": "12345",
       "transcript_id": "67890",
       "comment_text": "This is a sample comment.",
       "timestamp": "2024-08-23T10:20:30Z",
       "word_index": "1313"
     }
     ```

3. **Get All Comments for a Transcript**
   - **GET /comments**
   - **Description:** Retrieve all comments associated with a specific transcript.
   - **Query Parameters:**
     - `transcriptid`: The ID of the transcript.
   - **Example Request:**
     ```
     GET /comments?transcriptid=67890
     ```
   - **Response:**
     ```json
     [
       {
         "comment_id": "12345",
         "transcript_id": "67890",
         "comment_text": "This is a sample comment.",
         "timestamp": "2024-08-23T10:20:30Z",
         "word_index": "1313"
       },
       {
         "comment_id": "54321",
         "transcript_id": "67890",
         "comment_text": "Another comment.",
         "timestamp": "2024-08-23T11:15:45Z",
         "word_index": "1313"
       }
     ]
     ```

4. **Create a New Comment**
   - **POST /comment**
   - **Description:** Add a new comment to a transcript.
   - **Request Body:**
     ```json
     {
       "comment_id": "12345",
       "transcript_id": "67890",
       "comment_text": "This is a new comment.",
       "timestamp": "2024-08-23T12:00:00Z",
       "word_index": "1313"
     }
     ```
   - **Example Request:**
     ```json
     {
       "comment_id": "12345",
       "transcript_id": "67890",
       "comment_text": "This is a new comment.",
       "timestamp": "2024-08-23T12:00:00Z",
       "word_index": "1313"
     }
     ```
   - **Response:**
     ```json
     {
       "Operation": "SAVE",
       "Message": "SUCCESS",
       "Item": {
         "comment_id": "12345",
         "transcript_id": "67890",
         "comment_text": "This is a new comment.",
         "timestamp": "2024-08-23T12:00:00Z",
         "word_index": "1313"
       }
     }
     ```

5. **Update an Existing Comment**
   - **PATCH /comment**
   - **Description:** Modify an existing comment.
   - **Request Body:**
     ```json
     {
       "comment_id": "12345",
       "transcript_id": "67890",
       "update_key": "comment_text",
       "update_value": "Updated comment text."
     }
     ```
   - **Example Request:**
     ```json
     {
       "comment_id": "12345",
       "transcript_id": "67890",
       "update_key": "comment_text",
       "update_value": "Updated comment text."
     }
     ```
   - **Response:**
     ```json
     {
       "Operation": "UPDATE",
       "Message": "SUCCESS",
       "UpdatedAttributes": {
         "comment_text": "Updated comment text."
       }
     }
     ```

6. **Delete a Comment**
   - **DELETE /comment**
   - **Description:** Remove a comment from a transcript.
   - **Request Body:**
     ```json
     {
       "comment_id": "12345",
       "transcript_id": "67890"
     }
     ```
   - **Example Request:**
     ```json
     {
       "comment_id": "12345",
       "transcript_id": "67890"
     }
     ```
   - **Response:**
     ```json
     {
       "Operation": "DELETE",
       "Message": "SUCCESS",
       "Item": {
         "comment_id": "12345",
         "transcript_id": "67890",
         "comment_text": "This is a sample comment.",
         "timestamp": "2024-08-23T10:20:30Z",
         "word_index": "1313"
       }
     }
     ```

---

## **Error Handling**
- If an error occurs, the API will return a 400 status code with a message explaining the error.
- **Example Error Response:**
  ```json
  {
    "statusCode": 400,
    "body": "Error processing request"
  }
  ```

## **Example Usage with `curl`**

### **Check API Status**
```bash
curl -X GET "https://pde9nag7w2.execute-api.us-east-2.amazonaws.com/prod/status"
```

### **Get a Single Comment**
```bash
curl -X GET "https://pde9nag7w2.execute-api.us-east-2.amazonaws.com/prod/comment?commentid=12345&transcriptid=67890"
```

### **Create a New Comment**
```bash
curl -X POST "https://pde9nag7w2.execute-api.us-east-2.amazonaws.com/prod/comment" \
-H "Content-Type: application/json" \
-d '{"comment_id": "12345", "transcript_id": "67890", "comment_text": "This is a new comment.", "timestamp": "2024-08-23T12:00:00Z"}'
```

### **Update an Existing Comment**
```bash
curl -X PATCH "https://pde9nag7w2.execute-api.us-east-2.amazonaws.com/prod/comment" \
-H "Content-Type: application/json" \
-d '{"comment_id": "12345", "transcript_id": "67890", "update_key": "comment_text", "update_value": "Updated comment text."}'
```

### **Delete a Comment**
```bash
curl -X DELETE "https://pde9nag7w2.execute-api.us-east-2.amazonaws.com/prod/comment" \
-H "Content-Type: application/json" \
-d '{"comment_id": "12345", "transcript_id": "67890"}'
```

---

This documentation provides a comprehensive guide on how to use the TransMark API for managing comments on transcripts, including the various endpoints and examples of how to interact with them.

---

# File Upload API Documentation

## API Endpoint

**Base URL:** `https://6ssnwence3.execute-api.us-east-2.amazonaws.com/v1`

## Endpoints

### 1. **Upload File**

- **URL:** `/upload`
- **Method:** `POST`
- **Description:** Uploads a file to an S3 bucket after encoding it in base64.

#### Request

**Headers:**
- `Content-Type: application/json`

**Body:**

```json
{
  "file_name": "string",
  "file_content": "string"
}
```

- `file_name` (string): The name of the file, including the file extension (e.g., `example.pdf`).
- `file_content` (string): The base64-encoded content of the file.

**Example Request:**

```json
POST https://6ssnwence3.execute-api.us-east-2.amazonaws.com/v1/upload
Content-Type: application/json

{
  "file_name": "example.pdf",
  "file_content": "JVBERi0xLjQKJ... (base64-encoded content)"
}
```

#### Response

**Success:**

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "message": "File uploaded successfully!"
}
```

**Error:**

- **Status Code:** `400 Bad Request` (for invalid input)
- **Body:**

```json
{
  "message": "Error message describing what went wrong"
}
```

- **Status Code:** `500 Internal Server Error` (for server issues)
- **Body:**

```json
{
  "message": "Internal server error"
}
```

## How to Use

1. **Prepare Your File:**
   - Encode the file to base64 format. You can use tools or code snippets to encode the file (e.g., using JavaScript or Python).

2. **Send the Request:**
   - Use an HTTP client like Postman or a frontend application to send a `POST` request to the `/upload` endpoint.
   - Include the `file_name` and `file_content` in the request body.

3. **Check the Response:**
   - If successful, you will receive a `200 OK` response with a confirmation message.
   - If there's an issue with the request, the response will include an error message indicating what went wrong.

## Example Usage

### **Using Postman**

1. **Set the Request Type:** `POST`
2. **Set the URL:** `https://6ssnwence3.execute-api.us-east-2.amazonaws.com/v1/upload`
3. **Set the Headers:** `Content-Type: application/json`
4. **Set the Body Type to JSON:** 
   - Example JSON body:
     ```json
     {
       "file_name": "example.pdf",
       "file_content": "base64-encoded-string-of-the-pdf"
     }
     ```
5. **Send the Request** and review the response.

### **Using JavaScript (Frontend Example)**

```javascript
const uploadFileToS3 = async (base64File, fileName) => {
    const response = await fetch('https://6ssnwence3.execute-api.us-east-2.amazonaws.com/v1/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            file_name: fileName,
            file_content: base64File,
        }),
    });
    const result = await response.json();
    return result;
};
```

## Notes

- Ensure the base64 string is correctly encoded and does not include unnecessary prefixes (e.g., `data:application/pdf;base64,`).
- Check the API Gateway and Lambda logs in AWS CloudWatch for debugging if you encounter issues.

---

This documentation provides a clear guide for using your file upload API, including request and response formats, example usage, and troubleshooting tips.