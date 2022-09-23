import { Contact, Message, ScanStatus, WechatyBuilder } from "wechaty";
import { getNightGreets } from "./utils";

import qrTerm from "qrcode-terminal";

const options = {
    name: "moro-salamanca",
};

const bot = WechatyBuilder.build(options);


/**
 *
 * 2. Register event handlers for Bot
 *
 */
bot
    .on("logout", onLogout)
    .on("login", onLogin)
    .on("scan", onScan)
    .on("error", onError)
    .on("message", onMessage)
/**
 *
 * 3. Start the bot!
 *
 */
    .start()
    .catch(async (e) => {
	console.error("Bot start() fail:", e);
	await bot.stop();
	process.exit(-1);
    });

function onScan(qrcode: string, status: ScanStatus) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
	qrTerm.generate(qrcode);

	const qrcodeImageUrl = [
	    "https://wechaty.js.org/qrcode/",
	    encodeURIComponent(qrcode),
	].join("");

	console.info(
	    "onScan: %s(%s) - %s",
	    ScanStatus[status],
	    status,
	    qrcodeImageUrl
	);
    } else {
	console.info("onScan: %s(%s)", ScanStatus[status], status);
    }

    // console.info(`[${ScanStatus[status]}(${status})] ${qrcodeImageUrl}\nScan QR Code above to log in: `)
}

function onLogin(user: Contact) {
    console.info(`${user.name()} login`);
}

function onLogout(user: Contact) {
    console.info(`${user.name()} logged out`);
}

function onError(e: Error) {
    console.error("Bot error:", e);
}

/**
 *
 * 6. The most important handler is for:
 *    dealing with Messages.
 *
 */
async function onMessage(msg: Message) {
    console.info(msg.toString());

    if (msg.self()) {
	console.info("Message discarded because its outgoing");
	return;
    }

    if (msg.age() > 2 * 60) {
	console.info("Message discarded because its TOO OLD(than 2 minutes)");
	return;
    }

    const greet = await handleNightGreets(msg.text())
    if (greet != "") {
	await msg.say(`${greet}`);
    }
}

const handleNightGreets = async (msg: string) => {
    if (msg === "night") {
	const word = await getNightGreets()
	return word
    } else {
	return ""
    }
}

const welcome = 'welcome to booty bot'
console.info(welcome);
