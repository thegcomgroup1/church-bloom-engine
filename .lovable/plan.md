
## Leadership page update

1. **Upload the two photos as Lovable Assets**
   - `user-uploads://156.jpg` → `src/assets/leadership/timothy-fowler.jpg.asset.json` (Dr. Timothy Fowler with Robin)
   - `user-uploads://666.jpg` → `src/assets/leadership/alex-karnaushenko.jpg.asset.json` (Alex Karnaushenko with Alla)

2. **Edit `src/routes/leadership.tsx`**
   - Import the two new asset pointers.
   - Replace the `leaders` array with:
     1. **Dr. Timothy Fowler** — Lead Pastor & Founding Pastor. Photo: timothy-fowler. Bio: "Dr. Timothy Fowler — 'Timbo' to his friends — is One Hope's founding pastor, known for passionate leadership and a down-to-earth, humorous Bible teaching style. He's married to Robin, with four sons and six young grandchildren. He earned his Master of Divinity from Southern Seminary and Doctor of Ministry from Liberty University Divinity School, and also serves as Mission Strategist of the Catalina Baptist Association of churches in southern Arizona."
     2. **Alex Karnaushenko** — Pastor for Worship & Slavic Ministries. Photo: alex-karnaushenko. Bio: "Alex Karnaushenko is One Hope's Pastor for Worship and Slavic Ministries. Alex came to the U.S. as a refugee from war and is known for his resilient leadership and multi-talented music abilities. He's married to Alla and has three daughters. Alex earned a Master's in Computer Science and also works in the Community Ministry field here in Tucson."
     3. One remaining placeholder card ("Team Member — Role coming soon").
   - Net result: 3 cards total (was 4); two real leaders + one placeholder. The 3rd placeholder is removed as requested.

No other files changed.
