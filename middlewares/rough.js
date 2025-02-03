// // // GET USER BY ID

// // const getUserById = async (req, res) => {
// //     const { id } = req.params; // Extract the user ID from the route parameters
  
// //     try {
// //       // Fetch the user from the database using the ID
// //       const user = await User.findById(id);
  
// //       // If the user is not found, return a 404 response
// //       if (!user) {
// //         return res.status(404).json({ message: "User not found" });
// //       }
  
// //       // If user is found, return the user details
// //       res.status(200).json({
// //         message: "User fetched successfully",
// //         user: {
// //           id: user._id,
// //           username: user.username,
// //           email: user.email,
// //         },
// //       });
// //     } catch (error) {
// //       // Handle errors (e.g., invalid ObjectId format, database issues)
// //       console.error(error);
// //       res
// //         .status(500)
// //         .json({ message: "An error occurred while fetching the user" });
// //     }
// //   };
  
// //   // GET ALL USERS
  
// //   const getAllUsers = async (req, res) => {
// //     try {
// //       // Fetch all users from the database
// //       const users = await User.find({}, { password: 0 }); // Exclude the password field for security
  
// //       // Check if no users are found
// //       if (users.length === 0) {
// //         return res.status(404).json({ message: "No users found" });
// //       }
  
// //       // Return the list of users
// //       res.status(200).json({
// //         message: "Users fetched successfully",
// //         users,
// //       });
// //     } catch (error) {
// //       // Handle errors (e.g., database issues)
// //       console.error(error);
// //       res.status(500).json({ message: "An error occurred while fetching users" });
// //     }
// //   };
  
// //   // Create Appointment
// //   const createAppointment = async (req, res) => {
// //     const { clientName, appointmentDate, sicknessRecords, userId } = req.body; // userId is optional
  
// //     if (!clientName || !appointmentDate) {
// //       return res
// //         .status(400)
// //         .json({ message: "Client name and appointment date are required" });
// //     }
  
// //     try {
// //       // If userId is provided, check if it's a valid ObjectId
// //       if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
// //         return res.status(400).json({ message: "Invalid user ID format" });
// //       }
  
// //       // Create appointment with or without userId
// //       const appointment = await Appointment.create({
// //         clientName,
// //         appointmentDate,
// //         sicknessRecords: sicknessRecords || [],
// //         user: userId ? mongoose.Types.ObjectId(userId) : undefined, // Optional userId
// //       });
  
// //       res
// //         .status(201)
// //         .json({ message: "Appointment created successfully", appointment });
// //     } catch (error) {
// //       console.error(error);
// //       res
// //         .status(500)
// //         .json({ message: "An error occurred while creating the appointment" });
// //     }
// //   };
  
// //   // Add Sickness Record
// //   const addSicknessRecord = async (req, res) => {
// //     const { id } = req.params;
// //     const { sicknessName, visitDate, drugsPrescribed } = req.body;
  
// //     if (!sicknessName || !visitDate) {
// //       return res
// //         .status(400)
// //         .json({ message: "Sickness name and visit date are required" });
// //     }
  
// //     try {
// //       const appointment = await Appointment.findById(id);
// //       if (!appointment)
// //         return res.status(404).json({ message: "Appointment not found" });
  
// //       appointment.sicknessRecords.push({
// //         sicknessName,
// //         visitDate,
// //         drugsPrescribed: drugsPrescribed || [],
// //       });
  
// //       await appointment.save();
  
// //       res
// //         .status(200)
// //         .json({ message: "Sickness record added successfully", appointment });
// //     } catch (error) {
// //       console.error(error);
// //       res
// //         .status(500)
// //         .json({ message: "An error occurred while adding the sickness record" });
// //     }
// //   };
  
// //   // Get All Appointments
// //   const getAllAppointments = async (req, res) => {
// //     try {
// //       const appointments = await Appointment.find();
// //       res
// //         .status(200)
// //         .json({ message: "Appointments fetched successfully", appointments });
// //     } catch (error) {
// //       console.error(error);
// //       res
// //         .status(500)
// //         .json({ message: "An error occurred while fetching appointments" });
// //     }
// //   };
  
// //   // Get Appointment By ID
// //   const getAppointmentById = async (req, res) => {
// //     const { id } = req.params;
  
// //     try {
// //       const appointment = await Appointment.findById(id);
// //       if (!appointment)
// //         return res.status(404).json({ message: "Appointment not found" });
  
// //       res
// //         .status(200)
// //         .json({ message: "Appointment fetched successfully", appointment });
// //     } catch (error) {
// //       console.error(error);
// //       res
// //         .status(500)
// //         .json({ message: "An error occurred while fetching the appointment" });
// //     }
// //   };




// // Route to get all users (requires authentication)
// router
//   .route("/")
//   .get(auth, getAllUsers) // GET request to fetch all users (with auth)
//   .all(methodNotAllowed); // Reject other HTTP methods

// // Route to get a user by their ID (requires authentication)
// router
//   .route("/:id")
//   .get(auth, getUserById) // GET request to fetch user by ID (with auth)
//   .all(methodNotAllowed); // Reject other HTTP methods

// // Route to create an appointment
// router
//   .route("/appointments")
//   .post(auth, createAppointment) // Allows POST method for creating appointment
//   .all(methodNotAllowed); // Reject other HTTP methods

// // Route to add a sickness record to an appointment
// router
//   .route("/appointments/:id/sickness-record")
//   .post(auth, addSicknessRecord) // POST request to add sickness record (with auth)
//   .all(methodNotAllowed); // Reject other HTTP methods

// // Route to get all appointments (requires authentication)
// router
//   .route("/appointments")
//   .get(auth, getAllAppointments) // GET request to fetch all appointments (with auth)
//   .all(methodNotAllowed); // Reject other HTTP methods

// // Route to get an appointment by its ID (requires authentication)
// router
//   .route("/appointments/:id")
//   .get(auth, getAppointmentById) // GET request to fetch appointment by ID (with auth)
//   .all(methodNotAllowed); // Reject other HTTP methods