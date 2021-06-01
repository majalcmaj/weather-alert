exports.lambdaHandler = async (event, context) => {
    console.log("Input:");
    console.log(JSON.stringify(event, null, 2));
    return {shouldAlert: true}
};
