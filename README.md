# Fastfeet API

## Entities

- [x] Admin
- [x] Delivery person
- [x] Recipient
- [x] Order

## Use cases

- [x] Authenticate with CPF and password
- [x] CRUD Delivery person
- [x] CRUD Order
- [x] CRUD Recipient
- [x] Mark order as "pending" (available for pickup)
- [x] Pickup order
- [ ] Mark order as delivered
- [ ] Mark order as returned
- [ ] List orders with addresses near the delivery person
- [x] Change user's password
- [x] List user's deliveries
- [ ] Notify recipient on order status change

## Business rules

- [x] Only admin users can make CRUD operations on orders
- [x] Only admin users can make CRUD operations on delivery people
- [x] Only admin users can make CRUD operations on recipients
- [ ] To mark order as delivered, is mandatory to have a picture
- [ ] Only the delivery person that picked up the order can mark it as delivered
- [x] Only the admin user can change a user's password
- [x] A delivery person can only list their own deliveries
