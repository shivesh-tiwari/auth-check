import { Request, Response, NextFunction } from 'express';

// Second middleware function to handle the request
const handleRequest = (req: Request, res: Response, next: NextFunction) => {
  const submittedData = req.body; // Access the submitted data from the request body
  // Process the data or perform any necessary operations
  // ...
  res.json({ data: submittedData }); // Send a JSON response with the submitted data
};

export default handleRequest;
