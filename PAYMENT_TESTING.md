# Testing Payments Locally

## Setup

1. Start ngrok tunnel (port 3000):
   ```
   ngrok http 3000
   ```

2. Copy the `https://xxxx.ngrok-free.app` URL into `.env.local`:
   ```
   NEXT_PUBLIC_APP_URL=https://xxxx.ngrok-free.app
   ```

3. Restart the dev server so it picks up the new env value.

## Test a Mobile Money payment

1. Open the site and click **Buy Me a Coffee → Mobile Money**
2. Fill in name, a Uganda MTN/Airtel number, and amount (min UGX 500)
3. Submit — OlyCash sends a prompt to the phone
4. Approve the prompt on the phone with your PIN
5. OlyCash POSTs the result to your ngrok URL → forwarded to `localhost:3000/api/coffee/webhook`
6. The frontend polls every 5 s and transitions to the success/failure screen automatically

## Production

Set `NEXT_PUBLIC_APP_URL` to your live domain (e.g. `https://yourportfolio.com`) and redeploy — no other changes needed.
