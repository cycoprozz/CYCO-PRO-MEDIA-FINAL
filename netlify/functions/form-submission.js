// Netlify Function: Auto-respond to contact form submissions
// Triggered by Netlify Forms submission_created event

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { name, email, service, message } = body.payload.data;
  
  // The notification hook already emails techstylebyjoffre@gmail.com
  // This function logs the submission for tracking
  
  console.log(`New lead: ${name} (${email}) — ${service || 'No service selected'}`);
  console.log(`Message: ${message}`);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Thank you! We'll get back to you within 24 hours.",
      received: true
    })
  };
};
