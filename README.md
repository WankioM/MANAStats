# Decentraland Sales Data Heatmap
This project tracks Decentraland LAND sales data and compares it against the historical value of MANA (Decentraland's native token) to visualize price trends over time. The project uses a custom subgraph to fetch past sales data and represent it in an interactive heatmap using D3.js and React.

## Features
Custom Subgraph: Track historical Decentraland LAND sales and query sales information with The Graph.
MANA Value Tracking: Retrieve MANA token price data and overlay it on the sales data.
D3.js Heatmap: Visualize the sales and MANA price trends on a dynamic heatmap, with parcels color-coded based on sales prices.
Interactive Map: Users can interact with the map to view detailed parcel sales history, prices, and ownership information.

## Technologies Used
React: For building the interactive frontend interface.
D3.js: To generate the heatmap and visualize the data.
The Graph: For querying and indexing sales data from Decentraland’s smart contracts.
Custom Subgraph: For gathering sales data and MANA value tracking.
MANA API: To pull real-time and historical price data for MANA.

## Data Flow
Subgraph: The subgraph is responsible for fetching LAND sales data by listening to Transfer events on the LAND contract.
MANA Data: MANA price data is retrieved via a third-party API (e.g., CoinGecko) to track the value fluctuations over time.
Frontend: The data is combined and visualized using D3.js in the React frontend. A heatmap displays the sales value distribution and highlights trends based on historical MANA prices.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

Created By
This project was created by Tracy Wankio and Joyce Njeri.
For any questions or collaboration inquiries, please reach out to us at:

tracywankio9@gmail.com
njeriwangumo@gmail.com
