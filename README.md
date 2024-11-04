Rocketium-assignment-test
About
A collaborative document editor built with Socket.IO and Node.js. It allows users to edit documents in real-time with locking mechanisms to prevent simultaneous edits on the same document.

Setup

Navigate to the client and server directories.
Run npm install in each directory to install dependencies.


Tech Stack
Backend: Node.js, Express
Frontend: React, Socket.IO
Data Storage: In-memory storage for simplicity

Drawbacks
Each new socket connection is identified by a unique socket ID, which may lead to redundant data handling on reconnections.
Closing the application will result in the loss of all data since it is stored in memory. For better use cases, storing data in a database would ensure consistency and persistence.
