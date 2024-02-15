export default ( req , res , next) => {
  next
  ({
     error: 'Route not Found' 
  });
};
