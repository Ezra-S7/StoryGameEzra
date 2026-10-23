/*
Three Names, One Secret
A mystery game about three connected murders.
*/

// --------------------------------------------------
// SCENES
// --------------------------------------------------

let currentScene = "apartment";
let suspicion = 0;
let inventory = [];

const scenes = {

    apartment: {
        title: "Location: Your Apartment",
        character: "Identity: Your real self",
        text: "Over the past month, three people have died: a businessman, a politician, and a university professor. The police have not announced a connection, but you know the deaths are connected because you planned all three. You created three identities: Pablo Hernandez, Ezaak Butler, and Frederick McLovin. Your goal is to discover what investigators know without revealing that the identities belong to the same person.",
        image: "images/apartment.jpg",
        caption: "Your apartment is the only place where you can be yourself.",
        choices: [
            {
                text: "Watch the news and visit the police station",
                action: function () {
                    messageDisplay.textContent =
                        "The news reports that investigators are comparing witness statements.";
                },
                nextScene: "policestation"
            },
            {
                text: "Visit the hotel",
                nextScene: "hotel"
            },
            {
                text: "Visit the business office",
                nextScene: "office"
            },
            {
                text: "Review your three identities",
                action: function () {
                    messageDisplay.textContent =
                        "Pablo Hernandez, Ezaak Butler, and Frederick McLovin have separate backgrounds, but each has a connection to one of the victims.";
                }
            }
        ]
    },

    policestation: {
        title: "Location: Police Station",
        character: "Interviewee: Detective",
        text: "Investigators are comparing the three deaths. You want to learn what they know, but asking too many questions could attract attention.",
        image: "images/police.jpg",
        caption: "Investigators are beginning to look for a connection.",
        choices: [
            {
                text: "Ask a detective about the murders (+2 suspicion)",
                action: function () {
                    updateSuspicion(2);
                    messageDisplay.textContent =
                        "The detective mentions a witness who saw someone connected to a victim. The detective also begins questioning your interest.";
                },
                nextScene: "hotel"
            },
            {
                text: "Read the public case notice (+1 suspicion)",
                action: function () {
                    updateSuspicion(1);
                    pickUpItem("case notice");
                    messageDisplay.textContent =
                        "The notice reveals that investigators are comparing the victims' recent meetings. Someone notices your interest.";
                },
                nextScene: "office"
            },
            {
                text: "Leave the station",
                action: function () {
                    messageDisplay.textContent =
                        "You decide that asking more questions is not worth the risk.";
                },
                nextScene: "university"
            },
            {
                text: "Return to your apartment",
                nextScene: "apartment"
            }
        ]
    },

    hotel: {
        title: "Location: The Hotel",
        character: "Interviewee: Receptionist",
        text: "One of the victims was found at this hotel. You stayed here under the name Ezaak Butler. The receptionist may remember who visited around the time of the death.",
        image: "images/hotel.jpg",
        caption: "The hotel holds information about one of the victims.",
        choices: [
            {
                text: "Speak to the receptionist as Ezaak (+2 suspicion)",
                action: function () {
                    updateSuspicion(2);
                    pickUpItem("hotel record");
                    messageDisplay.textContent =
                        "The receptionist remembers Ezaak Butler and confirms that the police asked about the guests. Your questions attract attention.";
                },
                nextScene: "crimeScene"
            },
            {
                text: "Ask general questions about the victim",
                action: function () {
                    pickUpItem("witness statement");
                    messageDisplay.textContent =
                        "The receptionist remembers that the victim met someone shortly before the death but cannot recall the person's name.";
                },
                nextScene: "university"
            },
            {
                text: "Return to your apartment",
                nextScene: "apartment"
            }
        ]
    },

    office: {
        title: "Location: Business Office",
        character: "Interviewee: Company Employee",
        text: "The businessman worked with several companies. You previously visited this office as Pablo Hernandez, claiming to be a financial consultant. An employee remembers Pablo and the meeting with the victim.",
        image: "images/office.jpg",
        caption: "The businessman's professional life may hold important clues.",
        choices: [
            {
                text: "Speak to the employee as Pablo (+2 suspicion)",
                action: function () {
                    updateSuspicion(2);
                    pickUpItem("employee statement");
                    messageDisplay.textContent =
                        "The employee remembers Pablo and says investigators have asked about people who met the businessman recently.";
                },
                nextScene: "crimeScene"
            },
            {
                text: "Read the public company notice",
                action: function () {
                    pickUpItem("company notice");
                    messageDisplay.textContent =
                        "The notice confirms that the businessman met with several people outside the company.";
                },
                nextScene: "policestation"
            },
            {
                text: "Visit the first victim's building",
                nextScene: "crimeScene"
            },
            {
                text: "Return to your apartment",
                nextScene: "apartment"
            }
        ]
    },

    crimeScene: {
        title: "Location: The First Victim's Building",
        character: "Interviewee: Building Resident",
        text: "The businessman's apartment building has already been searched. A resident remembers that police asked about the victim's recent meetings. Returning to the area could attract unwanted attention.",
        image: "images/crime.jpg",
        caption: "The first death may connect the other cases.",
        choices: [
            {
                text: "Ask the resident about the investigation (+1 suspicion)",
                action: function () {
                    updateSuspicion(1);
                    pickUpItem("resident statement");
                    messageDisplay.textContent =
                        "The resident says investigators are interested in the victim's visitors and wonders why you are asking questions.";
                },
                nextScene: "university"
            },
            {
                text: "Review the public case timeline",
                action: function () {
                    pickUpItem("case timeline");
                    messageDisplay.textContent =
                        "The timeline shows that the businessman had several meetings shortly before his death.";
                },
                nextScene: "university"
            },
            {
                text: "Leave immediately",
                nextScene: "apartment"
            }
        ]
    },

    university: {
        title: "Location: The University",
        character: "Interviewee: Professor's Colleague",
        text: "The third victim was a university professor. You met him as Frederick McLovin. His colleague says the professor had recently become worried about someone he knew. The professor also kept a diary of appointments.",
        image: "images/university.jpg",
        caption: "The professor's records may reveal a connection.",
        choices: [
            {
                text: "Ask the colleague about the professor (+1 suspicion)",
                action: function () {
                    updateSuspicion(1);
                    pickUpItem("colleague statement");
                    messageDisplay.textContent =
                        "The colleague confirms that the professor was concerned about someone he had met. Your questions attract attention.";
                },
                nextScene: "university"
            },
            {
                text: "Examine the professor's diary",
                action: function () {
                    pickUpItem("professor diary");
                    messageDisplay.textContent =
                        "The diary contains an entry mentioning a meeting with Frederick McLovin. You have found a clue connecting one of your identities to the investigation.";
                },
                nextScene: "university"
            },
            {
                text: "Conclude the investigation",
                nextScene: "endingCheck"
            },
            {
                text: "Review the evidence using the diary",
                condition: "professor diary",
                nextScene: "endingCheck"
            },
            {
                text: "Return to your apartment",
                nextScene: "apartment"
            }
        ]
    },

    endingCheck: {
        title: "The Investigation Reaches Its Conclusion",
        character: "Case status: Final review",
        text: "The investigators are reaching their conclusions. Your suspicion level and the clues you collected will determine the outcome.",
        image: "images/city.jpg",
        caption: "The investigation is almost over.",
        choices: [
            {
                text: "See the final outcome",
                action: function () {
                    if (suspicion >= 5) {
                        updateScene("caught");
                    } else if (
                        inventory.includes("professor diary")
                    ) {
                        updateScene("identities");
                    } else {
                        updateScene("escape");
                    }
                }
            }
        ]
    },

    caught: {
        title: "Ending 3: You Are Caught",
        character: "Case status: Solved",
        text: "Investigators compare witness statements and records. Too many details point toward the same person. They connect Pablo Hernandez, Ezaak Butler, and Frederick McLovin to you and identify you as the person responsible for all three murders. Your attempt to keep the identities separate has failed.",
        image: "images/city.jpg",
        caption: "The investigation has reached you.",
        choices: [
            {
                text: "Play again",
                action: function () {
                    restartGame();
                }
            }
        ]
    },

    identities: {
        title: "Ending 2: The Identities Are Connected",
        character: "Case status: Partially solved",
        text: "Investigators discover links between Pablo Hernandez, Ezaak Butler, and Frederick McLovin. They believe the three deaths are connected, but they cannot establish who the real person behind the identities is. You escape identification, but all three personas are compromised.",
        image: "images/city.jpg",
        caption: "The identities are no longer separate.",
        choices: [
            {
                text: "Play again",
                action: function () {
                    restartGame();
                }
            }
        ]
    },

    escape: {
        title: "Ending 1: The Identities Remain Separate",
        character: "Case status: Unsolved",
        text: "The police continue investigating, but they cannot establish a convincing connection between the three identities. Without enough evidence to connect the cases to one person, the investigation loses momentum. You have avoided identification, at least for now.",
        image: "images/city.jpg",
        caption: "For now, the secret remains hidden.",
        choices: [
            {
                text: "Play again",
                action: function () {
                    restartGame();
                }
            }
        ]
    }
};

// --------------------------------------------------
// HTML ELEMENTS
// --------------------------------------------------

const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");
const sceneImage = document.getElementById("scene-image");
const imageCaption = document.getElementById("image-caption");

const suspicionDisplay = document.getElementById("suspicion-display");
const inventoryDisplay = document.getElementById("inventory-display");
const messageDisplay = document.getElementById("message-display");

// --------------------------------------------------
// UPDATE SCENES
// --------------------------------------------------

function updateScene(sceneName) {
    currentScene = sceneName;

    const scene = scenes[sceneName];

    sceneTitle.textContent = scene.title;
    sceneText.textContent = scene.text;
    characterName.textContent = scene.character;

    // Update the image and its caption for this location.
    sceneImage.src = scene.image;
    sceneImage.alt = scene.title;
    imageCaption.textContent = scene.caption;

    // Remove the old buttons.
    choicesContainer.innerHTML = "";

    // Create buttons for the choices in this scene.
    scene.choices.forEach(function (choice) {

        // Hide a choice until its required clue is collected.
        if (
            choice.condition &&
            !inventory.includes(choice.condition)
        ) {
            return;
        }

        const button = document.createElement("button");
        button.textContent = choice.text;

        button.addEventListener("click", function () {

            if (choice.action) {
                choice.action();
            }

            if (choice.nextScene) {
                updateScene(choice.nextScene);
            }
        });

        choicesContainer.appendChild(button);
        choicesContainer.appendChild(
            document.createTextNode(" ")
        );
    });

    // Refresh the displayed status and inventory.
    suspicionDisplay.textContent = suspicion;
    updateInventory();
}

// --------------------------------------------------
// SUSPICION STAT
// Adapted from the template's health system.
// --------------------------------------------------

function updateSuspicion(amount) {
    suspicion += amount;

    if (suspicion < 0) {
        suspicion = 0;
    }

    suspicionDisplay.textContent = suspicion;
}

// --------------------------------------------------
// INVENTORY
// --------------------------------------------------

function pickUpItem(itemName) {
    // Do not collect the same clue twice.
    if (!inventory.includes(itemName)) {
        inventory.push(itemName);
    }

    updateInventory();
}

function updateInventory() {
    inventoryDisplay.innerHTML = "";

    if (inventory.length === 0) {
        const item = document.createElement("li");
        item.textContent = "No clues collected";
        inventoryDisplay.appendChild(item);
    } else {
        inventory.forEach(function (clue) {
            const item = document.createElement("li");
            item.textContent = clue;
            inventoryDisplay.appendChild(item);
        });
    }
}

// --------------------------------------------------
// RESTART GAME
// --------------------------------------------------

function restartGame() {
    suspicion = 0;
    inventory = [];

    suspicionDisplay.textContent = suspicion;
    messageDisplay.textContent = "The investigation has restarted.";

    updateInventory();
    updateScene("apartment");
}

// --------------------------------------------------
// START THE GAME
// --------------------------------------------------

updateSuspicion(0);
updateInventory();
updateScene(currentScene);


