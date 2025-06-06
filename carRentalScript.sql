USE [carRental]
GO
/****** Object:  Table [dbo].[Cars]    Script Date: 28/05/2025 10:35:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cars](
	[vin] [varchar](17) NOT NULL,
	[carType] [varchar](50) NULL,
	[brand] [varchar](50) NULL,
	[carModel] [varchar](50) NULL,
	[image] [varchar](255) NULL,
	[yearOfManufacture] [int] NULL,
	[mileage] [varchar](50) NULL,
	[fuelType] [varchar](50) NULL,
	[available] [bit] NULL,
	[pricePerDay] [int] NULL,
	[description] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[vin] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 28/05/2025 10:35:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[orderId] [uniqueidentifier] NOT NULL,
	[customerName] [varchar](100) NULL,
	[phoneNumber] [varchar](20) NULL,
	[email] [varchar](100) NULL,
	[driversLicenseNumber] [varchar](50) NULL,
	[carVin] [varchar](17) NULL,
	[startDate] [date] NULL,
	[rentalPeriod] [int] NULL,
	[totalPrice] [int] NULL,
	[orderDate] [date] NULL,
	[status] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[orderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'02ac79d0856d4c3', N'Wagon', N'Mazda', N'CX-5', N'/images/02ac79d0856d4c3.jpg', 2010, N'47060 km', N'Gasoline', 0, 137, N'A sample CX-5 for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'03d0d1564b264e6', N'Coupe', N'Nissan', N'Altima', N'/images/03d0d1564b264e6.jpg', 2022, N'34316 km', N'Diesel', 1, 145, N'A sample Altima for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'1cf1057ed388498', N'Coupe', N'Nissan', N'Altima', N'/images/1cf1057ed388498.jpg', 2017, N'87818 km', N'Diesel', 1, 87, N'A sample Altima for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'2e71339c88c14a1', N'Coupe', N'Ford', N'Focus', N'/images/2e71339c88c14a1.jpg', 2014, N'69668 km', N'Hybrid', 0, 111, N'A sample Focus for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'357a4cd55b804d2', N'Wagon', N'Chevrolet', N'Malibu', N'/images/357a4cd55b804d2.jpg', 2023, N'27193 km', N'Gasoline', 1, 130, N'A sample Malibu for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'36c27f1071b146b', N'Wagon', N'Chevrolet', N'Malibu', N'/images/36c27f1071b146b.jpg', 2012, N'34285 km', N'Diesel', 1, 70, N'A sample Malibu for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'4586dff13322402', N'Sedan', N'Ford', N'Focus', N'/images/4586dff13322402.jpg', 2022, N'81957 km', N'Gasoline', 0, 66, N'A sample Focus for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'46dd4b48d4cb429', N'Sedan', N'BMW', N'3 Series', N'/images/46dd4b48d4cb429.jpg', 2010, N'10127 km', N'Hybrid', 0, 122, N'A sample 3 Series for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'53f593d67287478', N'SUV', N'BMW', N'3 Series', N'/images/53f593d67287478.jpg', 2012, N'63342 km', N'Gasoline', 0, 84, N'A sample 3 Series for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'546216f720524f4', N'Sedan', N'Volkswagen', N'Golf', N'/images/546216f720524f4.jpg', 2023, N'75615 km', N'Gasoline', 0, 125, N'A sample Golf for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'682e0853271844f', N'SUV', N'Hyundai', N'Elantra', N'/images/682e0853271844f.jpg', 2011, N'12511 km', N'Hybrid', 1, 133, N'A sample Elantra for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'7516dc36406343f', N'Coupe', N'Kia', N'Sportage', N'/images/7516dc36406343f.jpg', 2011, N'28513 km', N'Hybrid', 1, 105, N'A sample Sportage for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'80b71c87af18401', N'Wagon', N'Toyota', N'Corolla', N'/images/80b71c87af18401.jpg', 2019, N'57802 km', N'Hybrid', 1, 116, N'A sample Corolla for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'897d0c4703c444f', N'Wagon', N'Honda', N'Civic', N'/images/897d0c4703c444f.jpg', 2016, N'25601 km', N'Gasoline', 1, 88, N'A sample Civic for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'9590fa79a2624b5', N'Wagon', N'Honda', N'Civic', N'/images/9590fa79a2624b5.jpg', 2017, N'20533 km', N'Diesel', 0, 133, N'A sample Civic for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'996c371777fa4b8', N'Coupe', N'Volkswagen', N'Golf', N'/images/996c371777fa4b8.jpg', 2016, N'22482 km', N'Hybrid', 1, 67, N'A sample Golf for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'a754910945ad4f3', N'Wagon', N'Kia', N'Sportage', N'/images/a754910945ad4f3.jpg', 2011, N'42496 km', N'Diesel', 1, 115, N'A sample Sportage for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'c84ab39c34964cf', N'Sedan', N'Mazda', N'CX-5', N'/images/c84ab39c34964cf.jpg', 2019, N'21535 km', N'Hybrid', 0, 76, N'A sample CX-5 for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'd7bdf874a53f42e', N'Coupe', N'Toyota', N'Corolla', N'/images/d7bdf874a53f42e.jpg', 2023, N'56010 km', N'Gasoline', 0, 117, N'A sample Corolla for testing.')
INSERT [dbo].[Cars] ([vin], [carType], [brand], [carModel], [image], [yearOfManufacture], [mileage], [fuelType], [available], [pricePerDay], [description]) VALUES (N'e0d08733714e407', N'Sedan', N'Hyundai', N'Elantra', N'/images/e0d08733714e407.jpg', 2015, N'80744 km', N'Diesel', 1, 128, N'A sample Elantra for testing.')
GO
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'363275b2-6e1a-4281-8b2e-0859dc87214c', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'1cf1057ed388498', CAST(N'2025-05-25' AS Date), 1, 87, CAST(N'2025-05-25' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'26a3b5a3-84aa-4267-911e-0ad2c5335805', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'897d0c4703c444f', CAST(N'2025-05-28' AS Date), 2, 176, CAST(N'2025-05-28' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'f29e5d32-f0bf-4f59-9aad-1a0d5e6a7e52', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'2e71339c88c14a1', CAST(N'2025-05-28' AS Date), 1, 111, CAST(N'2025-05-28' AS Date), N'confirmed')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'9a59ed8d-853d-4867-86f8-1c808dfd07d9', N'Alice Tester', N'+61412345678', N'alice@example.com', N'DL999999', N'03d0d1564b264e6', CAST(N'2025-06-01' AS Date), 5, 400, CAST(N'2025-05-20' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'66e13165-240c-42d2-ab2d-2affe3a92cba', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'2e71339c88c14a1', CAST(N'2025-05-25' AS Date), 1, 111, CAST(N'2025-05-25' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'577ffa58-ede2-4489-a8f8-38aa5fd94779', N'Customer 4', N'+61441951752', N'customer4@example.com', N'DL000004', N'53f593d67287478', CAST(N'2025-04-04' AS Date), 6, 504, CAST(N'2025-04-02' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'f4bff8ad-ea66-402a-9177-3ad2b69fa450', N'Customer 3', N'+61426787256', N'customer3@example.com', N'DL000003', N'4586dff13322402', CAST(N'2025-04-03' AS Date), 4, 264, CAST(N'2025-04-01' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'aaf61d0e-e7be-4681-8465-4765a1c1418f', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'2e71339c88c14a1', CAST(N'2025-05-25' AS Date), 1, 111, CAST(N'2025-05-25' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'9a4f73c4-fa81-4b22-80e0-48e5591abd2d', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'333', N'1cf1057ed388498', CAST(N'2025-05-28' AS Date), 1, 87, CAST(N'2025-05-28' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'061c43e4-42fb-4a92-b914-4efe65f96a63', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'02ac79d0856d4c3', CAST(N'2025-05-28' AS Date), 1, 137, CAST(N'2025-05-28' AS Date), N'confirmed')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'6b13d4cc-1123-44a7-ac6a-5a6dcdf54112', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'357a4cd55b804d2', CAST(N'2025-05-28' AS Date), 1, 130, CAST(N'2025-05-28' AS Date), N'confirmed')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'e9d8bd86-ff56-4e5d-ac69-5aace9059bd8', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'02ac79d0856d4c3', CAST(N'2025-05-28' AS Date), 1, 137, CAST(N'2025-05-28' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'ca28074c-94b2-47c9-bc52-70e9e6af5774', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'1cf1057ed388498', CAST(N'2025-05-25' AS Date), 2, 174, CAST(N'2025-05-25' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'8ffa664b-24a5-41b8-b7b9-760584e59103', N'Yong', N'0424099817', N'yong@gmail.com', N'123', N'03d0d1564b264e6', CAST(N'2025-05-31' AS Date), 2, 290, CAST(N'2025-05-25' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'1df64f30-ce0d-4e7c-97f8-83a0fb728594', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'1cf1057ed388498', CAST(N'2025-05-25' AS Date), 1, 87, CAST(N'2025-05-25' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'5cf3bd47-b4f5-4f1f-936f-8a7ef56d5839', N'test1', N'123', N'yong@gmail.com', N'123', N'46dd4b48d4cb429', CAST(N'2025-05-25' AS Date), 2, 244, CAST(N'2025-05-25' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'31853c02-8e33-4258-babf-9419b217b13f', N'Customer 2', N'+61409696676', N'customer2@example.com', N'DL000002', N'897d0c4703c444f', CAST(N'2025-04-02' AS Date), 5, 440, CAST(N'2025-03-31' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'8d0001da-4d60-4d99-bc35-98272a4c0fe7', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'1cf1057ed388498', CAST(N'2025-05-28' AS Date), 1, 87, CAST(N'2025-05-28' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'cd75c799-b943-409e-8c10-985d67ee8fd2', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'02ac79d0856d4c3', CAST(N'2025-05-28' AS Date), 1, 137, CAST(N'2025-05-28' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'16894b76-9937-4733-9579-ac88620bd8be', N'Customer 1', N'+61498071594', N'customer1@example.com', N'DL000001', N'd7bdf874a53f42e', CAST(N'2025-04-01' AS Date), 6, 702, CAST(N'2025-03-30' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'eb821c19-2103-4d99-8b51-b2655389d2e9', N't', N'0424099817', N'leekimgech@gmail.com', N'123', N'2e71339c88c14a1', CAST(N'2025-05-25' AS Date), 2, 222, CAST(N'2025-05-25' AS Date), N'confirmed')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'03c7b5c1-2230-495e-92f3-bfac6a1dae18', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'02ac79d0856d4c3', CAST(N'2025-05-28' AS Date), 1, 137, CAST(N'2025-05-28' AS Date), N'confirmed')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'ac3d0a32-750b-4f7e-a82d-c19f27f35daf', N'test', N'123', N'yong@gmail.com', N'333', N'46dd4b48d4cb429', CAST(N'2025-05-25' AS Date), 2, 244, CAST(N'2025-05-25' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'a5df4281-1025-4618-bd02-c5b8296b701e', N'Customer 5', N'+61468987589', N'customer5@example.com', N'DL000005', N'c84ab39c34964cf', CAST(N'2025-04-05' AS Date), 4, 304, CAST(N'2025-04-03' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'adb6688f-a196-4ada-9b6c-c9fb23083b15', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'2e71339c88c14a1', CAST(N'2025-05-25' AS Date), 2, 222, CAST(N'2025-05-25' AS Date), N'pending')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'da6c93f0-aa0a-4d53-a9e9-cd6aaeede967', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'02ac79d0856d4c3', CAST(N'2025-05-28' AS Date), 1, 137, CAST(N'2025-05-28' AS Date), N'confirmed')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'7cfc2e95-79ef-43f4-ac07-ce2b66632a04', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'03d0d1564b264e6', CAST(N'2025-05-31' AS Date), 2, 290, CAST(N'2025-05-25' AS Date), N'confirmed')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'c99be793-817e-4196-b7d5-d3ae58f9c9ec', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'1cf1057ed388498', CAST(N'2025-05-28' AS Date), 1, 87, CAST(N'2025-05-28' AS Date), N'confirmed')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'fcb45af4-2edc-4ea6-bd6b-d9eb5f49dd8a', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'1cf1057ed388498', CAST(N'2025-05-25' AS Date), 1, 87, CAST(N'2025-05-25' AS Date), N'confirmed')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'f9a2b5cd-3f9c-424c-a8e6-e1cc2b4ec0fa', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'333', N'46dd4b48d4cb429', CAST(N'2025-05-25' AS Date), 1, 122, CAST(N'2025-05-25' AS Date), N'confirmed')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'996731c3-12a8-4210-9c9a-f0a688039212', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'03d0d1564b264e6', CAST(N'2025-05-28' AS Date), 1, 145, CAST(N'2025-05-28' AS Date), N'confirmed')
INSERT [dbo].[Orders] ([orderId], [customerName], [phoneNumber], [email], [driversLicenseNumber], [carVin], [startDate], [rentalPeriod], [totalPrice], [orderDate], [status]) VALUES (N'10efb779-da4a-4f9b-b8bd-f7c3255813ef', N'Kimgech Pov', N'0424099817', N'leekimgech@gmail.com', N'123', N'897d0c4703c444f', CAST(N'2025-05-28' AS Date), 1, 88, CAST(N'2025-05-28' AS Date), N'pending')
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (newid()) FOR [orderId]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD FOREIGN KEY([carVin])
REFERENCES [dbo].[Cars] ([vin])
GO
