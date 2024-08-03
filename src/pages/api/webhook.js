export default async (req, res) => {
    if (req.method === 'POST') {
      const { slug } = req.body;
  
      try {
        await res.revalidate(`/page/${slug}`);
        return res.status(200).json({ message: 'Revalidated' });
      } 
      catch (err) {
        return res.status(500).json({ message: 'Error revalidating' });
      }
    } 
    
    else {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  };
  