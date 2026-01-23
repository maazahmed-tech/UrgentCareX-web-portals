# UrgentCareX - Web Portals Requirements Document

**Portals:** Admin Panel, Facility Portal, Doctor Portal  
**Document Type:** Wireframe Requirements for Figma Make AI  
**Frame Size:** 1440 x 900 (Desktop Web) | 390 x 844 (Mobile Responsive)  
**Last Updated:** January 2026  
**Total Screens:** ~46 screens across all portals

---

## DESIGN SYSTEM (Match Patient App)

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Dark | #1F2937 | Headers, buttons, sidebar, text |
| Secondary | #6B7280 | Secondary text, icons |
| Light Gray | #F3F4F6 | Backgrounds, cards |
| Border | #E5E7EB | Borders, dividers |
| White | #FFFFFF | Card backgrounds |
| Success | #10B981 | Active status, approvals |
| Warning | #F59E0B | Pending status |
| Error | #EF4444 | Errors, rejections, logout |

### Typography
| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| H1 | 28px | Bold | Page titles |
| H2 | 24px | Semibold | Section headers |
| H3 | 20px | Semibold | Card titles |
| Body | 16px | Regular | Body text |
| Caption | 14px | Regular | Labels, table headers |
| Small | 12px | Regular | Timestamps, metadata |

### Component Specs (Web)
| Component | Height | Border Radius |
|-----------|--------|---------------|
| Input Field | 44px | 8px |
| Primary Button | 44px | 8px |
| Secondary Button | 40px | 8px |
| Card | Auto | 12px |
| Table Row | 56px | 0 |
| Sidebar | Full Height | 0 |
| Top Header | 64px | 0 |
| Sidebar Width | 256px (expanded) / 64px (collapsed) | 0 |

### Navigation Pattern
- **Desktop:** Fixed left sidebar (collapsible) + top header
- **Mobile:** Hamburger menu with slide-out drawer
- All portals use sidebar navigation with icon + label

---

## SUBSCRIPTION PLANS (Facility Portal & Doctor Portal)

Both Facility Portal and Doctor Portal use the same subscription structure:

| Plan | Price | Duration | Features | Payment Required |
|------|-------|----------|----------|------------------|
| Trial | Free | 14 days | All features | Card required at signup |
| Monthly | $49 | 1 month | All features | Card charged monthly |
| Yearly | $499 | 1 year | All features | Card charged annually |

**Key Points:**
- All plans include 100% of features (no feature restrictions)
- Card details must be provided during signup to unlock the 14-day trial
- After trial expires, users must select Monthly ($49) or Yearly ($499) plan
- Yearly plan saves $89/year compared to monthly ($588/year vs $499/year)

---

# PORTAL 1: ADMIN PANEL

## 1. App Overview

The Admin Panel is a simple, dashboard-focused web app for UrgentCareX administrators. It lets admins see important numbers at a glance (like how many facilities and doctors are registered), view user activity, and manage basic platform settings.

**Who it's for:** UrgentCareX internal administrators who need to monitor platform health and basic user metrics.

## 2. Main Goals

1. Show key platform numbers on a simple dashboard
2. Let admins see lists of registered facilities and doctors
3. Show subscription counts (trial, monthly, annual)
4. Display recent sign-ups and activity
5. Provide basic settings management

## 3. User Stories

| ID | User Story |
|----|------------|
| US-A001 | As an admin, I want to see a dashboard with key numbers so that I can quickly check platform health |
| US-A002 | As an admin, I want to see a list of all facilities so that I can know who is using our platform |
| US-A003 | As an admin, I want to see a list of all doctors so that I can track provider registrations |

## 4. Screens

### Admin Screen List

| ID | Screen Name | What's On It |
|----|-------------|--------------|
| S-A001 | Admin Login | Email input, password input, login button, logo |
| S-A002 | Admin Dashboard | 4 metric cards, subscription summary, recent activity feed |
| S-A003 | Facilities List | Search bar, filter dropdown, data table with facility info |
| S-A004 | Facility Details | Read-only view of facility profile, subscription info |
| S-A005 | Doctors List | Search bar, filter dropdown, data table with doctor info |
| S-A006 | Doctor Details | Read-only view of doctor profile, credentials |
| S-A007 | Settings | Admin profile form (name, email), change password button |
| S-A008 | Change Password | Current password, new password, confirm fields |

---

# PORTAL 2: FACILITY PORTAL

## 1. App Overview

The Facility Portal is a streamlined web app for urgent care centers, clinics, and medical facilities that partner with UrgentCareX. Facility managers can manage their facility profile (including operating hours, services, and status), and subscription. Doctors independently register and manage themselves through the Doctor Portal.

**Who it's for:** Facility managers and administrators at urgent care centers, clinics, and medical facilities.

## 2. Main Goals

1. Let facilities update their profile (name, address, contact info, status)
2. Let facilities manage operating hours and services offered
3. Display facility status (active/inactive)
4. Manage subscription (14-day Trial, Monthly $49, Yearly $499)
5. Provide basic settings and notifications

**Note:** Appointment scheduling and doctor roster management have been removed. Doctors register and manage themselves independently through the Doctor Portal.

## 3. User Stories

| ID | User Story |
|----|------------|
| US-F001 | As a facility manager, I want to update my facility profile so that patients see accurate information |
| US-F002 | As a facility manager, I want to manage operating hours so that patients know when we're open |
| US-F003 | As a facility manager, I want to manage services offered so that patients know what we provide |
| US-F004 | As a facility manager, I want to change my subscription plan so that I can upgrade or downgrade |
| US-F005 | As a facility manager, I want to set my facility status (active/inactive) so that I can control visibility |

## 4. Screens

### Facility Portal Screen List

| ID | Screen Name | What's On It |
|----|-------------|--------------|
| S-F001 | Facility Login | Email, password inputs, login button, forgot password link |
| S-F002 | Forgot Password | Email input, send reset link button |
| S-F003 | Password Reset | New password, confirm password inputs |
| S-F004 | Facility Dashboard | Quick stats cards (status, subscription), recent activity, profile completeness |
| S-F005 | Facility Profile | Profile form (name, address, contact, operating hours, services, status toggle) |
| S-F006 | Subscription Overview | Current plan card, features list, payment history, billing info |
| S-F007 | Change Plan | Plan comparison cards (Trial, Monthly, Annual), select button for each |
| S-F008 | Payment Method | Card input form, billing address, save button |
| S-F009 | Facility Settings | Account info, notification preferences, email settings |
| S-F010 | Change Password | Current, new, confirm password fields |
| S-F011 | Notifications Panel | List of notifications with timestamps, mark as read |

**Navigation Structure (4 items):**
- Dashboard
- Profile
- Subscription
- Settings

---

# PORTAL 3: DOCTOR PORTAL

## 1. App Overview

The Doctor Portal is a web app for individual doctors who use UrgentCareX. Doctors can manage their profile, set availability, view appointments, access patient information, view analytics, and manage subscriptions.

**Who it's for:** Licensed doctors and healthcare providers who see patients through UrgentCareX.

## 2. Main Goals

1. Let doctors create and maintain their professional profile
2. Let doctors set and update their availability schedule
3. Show doctors their upcoming and past appointments
4. Give doctors access to patient info before appointments
5. Display basic practice analytics (patients seen, ratings)
6. Manage individual subscription (14-day Trial, Monthly $49, Yearly $499)

## 3. Screens

### Doctor Portal Screen List

| ID | Screen Name | What's On It |
|----|-------------|--------------|
| S-D001 | Doctor Login | Email, password, login button, forgot password, sign up link |
| S-D002 | Doctor Registration Step 1 | Email, password, confirm password |
| S-D003 | Doctor Registration Step 2 | Name, specialty, phone number |
| S-D004 | Doctor Registration Step 3 | License number, NPI, facility affiliation (optional) |
| S-D005 | Registration Success | Success message, go to dashboard button |
| S-D006 | Forgot Password | Email input, send reset button |
| S-D007 | Doctor Dashboard | Today's schedule, stats cards, next patient preview |
| S-D008 | Doctor Profile | Profile form, photo upload, bio, specialties |
| S-D009 | Manage Credentials | List of licenses, certifications with add/edit |
| S-D010 | Add Credential | Form for credential type, number, expiry |
| S-D011 | Availability Calendar | Week view calendar with time slots |
| S-D012 | Add Time Slot | Start time, end time, repeat options |
| S-D013 | Edit Time Slot | Same as add, pre-filled, with delete option |
| S-D014 | Add Time Off | Date range picker, reason (optional) |
| S-D015 | Appointments - Today | Today's appointments list with patient previews |
| S-D016 | Appointments - Upcoming | Future appointments list |
| S-D017 | Appointments - Past | Historical appointments list |
| S-D018 | Appointment Details | Full appointment view, patient info, status controls |
| S-D019 | Patient Preview | Patient summary: history, allergies, medications, notes |
| S-D020 | Analytics Dashboard | Charts: patients seen, rating trend, review summary |
| S-D021 | Reviews List | All patient reviews with ratings |
| S-D022 | Subscription Overview | Current plan, features, billing info |
| S-D023 | Change Plan | Plan comparison, selection |
| S-D024 | Payment Method | Card form, update payment |
| S-D025 | Doctor Settings | Account info, notifications, password section |
| S-D026 | Change Password | Current, new, confirm password |
| S-D027 | Notifications Panel | List of notifications |

---

## TOTAL SCREEN COUNT

- **Admin Panel:** 8 screens
- **Facility Portal:** 11 screens (streamlined from 21)
- **Doctor Portal:** 27 screens
- **TOTAL:** 46 screens

**Facility Portal Changes:**
- Removed 10 screens: 4 doctor roster management screens, 3 appointment screens, 1 analytics dashboard, 2 separate operating hours/services screens
- Consolidated operating hours and services into the main profile screen
- Simplified navigation to 4 main items (Dashboard, Profile, Subscription, Settings)
- Focus: Profile management and subscription only

---

## NEXT STEPS

This document provides the foundation for creating wireframes in Figma. Each screen should follow the design system specifications above and maintain consistency across all three portals.