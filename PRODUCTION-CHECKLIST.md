# Production Deployment Checklist

This checklist covers everything needed to ensure the application is ready for production deployment with Stripe integration.

## ✅ Stripe Configuration

- [x] Stripe mode set to `live` in all components
  - [x] `PricingOptions.tsx`
  - [x] `payment-success.tsx`
  - [x] `ResultsState.tsx`
- [x] Production price IDs configured
  - [x] Meal plan: `price_1OVmKTP3RUANtq4L8QBqxBLi` (from product `prod_SFBGFsICFLW0zI`)
  - [x] Workout plan: `price_1OVmKnP3RUANtq4L1XH1kzDO` (from product `prod_SFBJvpUpVe0aYO`)
  - [x] Combined plan: `price_1OVmLNP3RUANtq4LjNDL2vWh` (from product `prod_SFBNKgtJz21qeo`)
- [x] Stripe webhook configured in Stripe Dashboard (required for payment success/failure notifications)
  - [x] Verify webhook endpoint is pointing to your production server

## ✅ Webhook Service

- [x] Webhook URLs configured correctly
  - [x] `WEBHOOK_URL` = `https://sava.automationaid.eu/webhook/meal-plan-bg`
  - [x] `MEAL_PLAN_WEBHOOK_URL` = `https://sava.automationaid.eu/webhook/meal-plan-bg`
  - [x] `WORKOUT_PLAN_WEBHOOK_URL` = `https://sava.automationaid.eu/webhook/workout-plan-bg`
- [x] Webhook authentication token configured

## ✅ Application

- [x] Payment canceled flow redirects back to plan selection
- [x] Form data is preserved when returning from canceled payment
- [x] Application successfully builds for production (`npm run build`)
- [ ] Test all payment flows in a staging environment

## 📋 Final Production Deployment Steps

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to production server**
   - Upload the build files to your web hosting
   - If using a CI/CD pipeline, trigger the deployment

3. **Verify production deployment**
   - Test the checkout flow with a real card
   - Verify webhooks are being triggered
   - Check Stripe Dashboard for successful payments
   - Validate that users receive their plans via email

4. **Monitoring and Support**
   - Set up error monitoring
   - Create a system to track and respond to customer support requests
   - Monitor Stripe events for payment failures

## 🔒 Security Considerations

- [ ] Ensure HTTPS is enabled for all production URLs
- [ ] Verify Stripe public keys are properly restricted
- [ ] Implement CORS policies on the server

---

## Troubleshooting Common Issues

### Payments are successful but webhooks aren't triggering
- Check Stripe webhook configuration in the Stripe Dashboard
- Verify webhook endpoints are accessible from the internet
- Look for webhook errors in the Stripe Dashboard

### Users aren't receiving their plans after payment
- Check webhook logs to ensure the webhooks are being triggered
- Verify that the email system at automationaid.eu is functioning properly
- Ensure form data is being properly submitted in the webhook payload

### Payment flow is interrupted or returns errors
- Check browser console for JavaScript errors
- Verify all Stripe keys are valid and not expired
- Check Stripe Dashboard for any account restrictions or limitations 