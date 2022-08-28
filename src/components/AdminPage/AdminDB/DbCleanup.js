import React from "react";
import { guestCartCleanup } from "../../../api";

const DbCleanup = () => {
function handleCleanupButton () {
    (async()=>{
        const result = await guestCartCleanup();
        if (result) alert("Cleanup was successful")
        else alert("Something went wrong with cleanup")
    })()
}

return (<>
    <h5>Clicking the button below:</h5>
    <ul>
        <li>WILL delete non-purchased guest carts from the db</li>
        <li>WILL delete the carts associated with those items</li>
        <li>WILL NOT affect logged in users</li>
        <li>WILL NOT delete the cart items stored client-side, even for guest users</li>
    </ul>
    <h5>Guests who are currently checking out will<br></br>need to restart the checkout process</h5>
    
    <button type="submit" className="btn btn-primary me-3" onClick={handleCleanupButton}>Delete Guest Carts</button>

    </>
)
}

export default DbCleanup