
async function initializePage() {
    try {
        // Fetch the followers and user data concurrently
        const [followersResponse, countResponse] = await Promise.all([
            fetch('/fetchFollower'),
            fetch('/getTotalFollower')
        ]);

        const followersResult = await followersResponse.json();
        const countResult = await countResponse.json();

        if (followersResult.success) {
            console.log(followersResult.data)
            let dataDate = getNewFollowercount(followersResult.data)
            console.log(dataDate)

            displayCurrentNewFollowers(dataDate[dataDate.length - 1])
            
            console.table(alasql(`
                SELECT
                    CONCAT(SUBSTR(week, 1, 4), '-', SUBSTR(week, 6, 2), '-01') AS month,
                    SUM(count) AS total_count
                FROM ?
                GROUP BY month
                ORDER BY month;
            `, [dataDate]));
            
            updateUserInfo(followersResult.data.subject);
            // If needed: populateFollowerList(followersResult.data.followers);
        } else {
            console.error("Failed to fetch followers:", followersResult.message);
        }
        document.querySelector("#totalUser").innerHTML = countResult.data
        console.log("Follower Count:", countResult);
    } catch (error) {
        console.error("Error during initialization:", error);
    }
}function displayCurrentNewFollowers(item) {
    let status = "";
    if (item.status === "red") {
        status = `
        <span class="text-red-600"><i class="fas fa-caret-down"></i></span>
        `;
    }
    else if (item.status === "green") {
        status = `
        <span class="text-green-600"><i class="fas fa-caret-up"></i></span>
        `;
    }
    else if (item.status === "neutral") {  // Corrected this to "neutral"
        status = `
        <span class="text-yellow-600"><i class="fas fa-caret-equal"></i></span>
        `;
    }
    document.querySelector("#newUserData").innerHTML = `${item.count} ${status}`;
}

function updateUserInfo(info) {
    if (!info || !info.avatar || !info.displayName) {
        console.error("Invalid user info received:", info);
        return;
    }

    // Cache DOM elements
    const usernameElement = document.querySelector("#username");
    const avatarElement = document.querySelector("#avatarSrc");

    // Update DOM with user information
    usernameElement.textContent = info.displayName;
    avatarElement.src = info.avatar;
}
