export default {
  // Authentication
  login: 'auth/authenticate', // Login - POST
  confirmAccount: 'auth/confirmMail', // Confirm user account with token - POST
  emailConfirmation: 'auth/resendConfirmation', // Resent email confirmation - POST
  register: 'auth', // Registration - Post
  userSession: 'users/session/get', // Get User session details - Get
  forgotPassword: 'auth/forgotPassword', // Send reset password link - POST
  resetPassword: 'auth/passwordReset', // Reset Password with token - POST

  // Users
  users: 'users', // Get all user - GET
  kyc: 'users/kyc/updateKyc', // Update user KYC - POST
  notify: 'users/notify/mail', // Notify User by mail
  fundWallet: 'users/wallet/fundWallet', // Fund wallet - POST
  changePassword: 'users/changePasswordLoggedInUser', // Reset Password with token - POST
  block: 'admin/blockUser', // Block user with ID - PUT
  unblock: 'admin/unblockUser', // Unblock user with ID - PUT
  // Cards
  addCard: 'cards', // Add a new card - POST /Get card by ID / Delete card with ID
  myCards: 'cards/getAllCards/me', // Add a new card - POST / Delete card with ID
  userCards: 'cards/getAllUserCards/admin', // Add a new card - POST / Delete card with ID

  // Roles & Permission
  roles: 'roles', // Get all roles - GET / Create roles - POST / Delete roles with ID - DEL / Update roles with ID - PUT
  permission: 'roles/permissions/all', // Get all permission - GET

  // Banks
  addBank: 'bank', // Add a new bank - POST
  deleteBank: 'bank', // Delete a new bank - DEL - /bankID

  // Wallet
  updateWallet: 'admin/updateUserWallet', // Update user wallet ID - PUT

  // Plan
  plans: 'plans', // Create plan - POST / Delete plan with ID - DEL / Edit plan with ID - PUT / Get all plans and a single plan with ID - GET
  // Plan
  settings: 'app_settings', // Get andyUpdate app settings - POST

  // Investments
  invest: 'investment', // Create plan - POST / Delete plan with ID - DEL / Edit plan with ID - PUT / Get all plans and a single plan with ID - GET
  adminInvest: 'investment/admin/investForAUser', // Create plan - POST / Delete plan with ID - DEL / Edit plan with ID - PUT / Get all plans and a single plan with ID - GET
  investment: 'investment', // Create plan - POST / Delete plan with ID - DEL / Edit plan with ID - PUT / Get all plans and a single plan with ID - GET
  myInvestment: 'investment/getAllInvestments/me', // Create plan - POST / Delete plan with ID - DEL / Edit plan with ID - PUT / Get all plans and a single plan with ID - GET
  userInvestment: 'investment/getAllUserInvestments/admin', // Get all users investments - GET

  // Transactions
  transactions: 'transactions', // Create plan - POST / Delete plan with ID - DEL / Edit plan with ID - PUT / Get all plans and a single plan with ID - GET
  myTransactions: 'transactions/getAllMyTransactions', // Get all users transactionss - GET with ID
  userTransactions: 'transactions/getAllUserTransactions/admin', // Get all users transactionss - GET with ID

  // Withdrawals
  withdrawal: 'withdrawal', // Create plan - POST / Delete plan with ID - DEL / Edit plan with ID - PUT / Get all plans and a single plan with ID - GET
  myWithdrawal: 'withdrawal/getAllMyWithdrawals', // Get all users withdrawals - GET with ID
  userwithdrawal: 'withdrawal/getAllUserWithdrawals/admin', // Get all users withdrawals - GET with ID
  approveWithdrawal: 'withdrawal/approveWithdrawal', // Approve withdrawal Request
  declineWithdrawal: 'withdrawal/disApproveWithdrawal', // Decline withdrawal Request

  errorLog: 'error-logs' // Get error logs

}
