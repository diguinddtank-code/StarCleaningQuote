export default function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { bedrooms = 1, bathrooms = 1, type = 'Standard', frequency = 'OneTime' } = req.body;

    // --- SECURE PRICING LOGIC ---
    // This code runs on the server, invisible to the client.
    
    const BASE_PRICE = 100;
    const BEDROOM_COST = 20;
    const BATHROOM_COST = 15;

    let total = BASE_PRICE;

    // 1. Add Room Costs
    total += (parseInt(bedrooms) * BEDROOM_COST);
    total += (parseFloat(bathrooms) * BATHROOM_COST);

    // 2. Service Type Multipliers
    if (type === 'Deep') {
      total = total * 1.30; // +30%
    } else if (type === 'MoveInOut') {
      total = total * 1.50; // +50%
    }

    // 3. Frequency Discounts
    let discountPercent = 0;
    if (frequency === 'Weekly') {
      discountPercent = 0.20;
    } else if (frequency === 'BiWeekly') {
      discountPercent = 0.15;
    } else if (frequency === 'Monthly') {
      discountPercent = 0.10;
    }

    const discountAmount = total * discountPercent;
    const finalTotal = total - discountAmount;

    // Return the calculated values
    res.status(200).json({
      subtotal: total,
      discount: discountAmount,
      total: finalTotal
    });

  } catch (error) {
    res.status(500).json({ message: 'Calculation error' });
  }
}