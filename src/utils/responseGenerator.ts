
export const generateSampleResponse = (prompt: string) => {
  // Very basic response generation for demo purposes
  if (prompt.toLowerCase().includes('code') || prompt.toLowerCase().includes('function')) {
    return `Here's a sample function to get you started:

\`\`\`javascript
function processData(input) {
  // Input validation
  if (!input || typeof input !== 'object') {
    throw new Error('Input must be a valid object');
  }
  
  // Process the data
  const result = {
    processed: true,
    timestamp: new Date().toISOString(),
    data: input
  };
  
  return result;
}
\`\`\`

This function takes an input object, validates it, and returns a processed result with metadata. You can extend this with specific logic for your use case.`;
  } else if (prompt.toLowerCase().includes('list') || prompt.toLowerCase().includes('steps')) {
    return `Here are the recommended steps:

1. **Analyze Current Situation**: Review existing assets and identify gaps
2. **Set Clear Objectives**: Define specific, measurable goals
3. **Develop Strategy**: Create a comprehensive approach
4. **Implement Tactics**: Execute specific actions
5. **Measure Results**: Track performance against objectives
6. **Iterate and Improve**: Make data-driven adjustments

Each step should be documented and shared with relevant stakeholders.`;
  } else {
    return `Based on your request, I recommend taking a structured approach that balances innovation with practicality. The key is to focus on user needs while maintaining alignment with business objectives.

Consider these aspects:
- Identify primary user pain points
- Prioritize solutions based on impact vs. effort
- Develop a phased implementation plan
- Establish clear metrics for success

This approach will help ensure that your project delivers meaningful results while managing scope effectively.`;
  }
};
