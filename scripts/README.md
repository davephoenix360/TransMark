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