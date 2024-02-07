/**
 * Sends a GraphQL query to the backend server and retrieves the response.
 *
 * @param {string} query - The GraphQL query to send.
 * 
 * @returns {Promise<Object>} A promise that resolves to the response data.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server. 
 */
export async function sendQuery(query) {
  // Part 1: Initialize the request
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query }),
    credentials: "include",
  };

  // Part 2: Send the request
  const response = await fetch("http://localhost:4000/graphql", requestInit);
  const responseBody = await response.json();

  // Part 3: Handle the response
  if (response.ok) return responseBody.data;
  else throw new Error(responseBody.errors[0].message);
}
