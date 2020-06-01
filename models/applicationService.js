const mongoose = require('mongoose');
const _ = require('lodash');

var applicationSchema = mongoose.Schema({
	driver: {
		name: {
			type : String,
			trim : true
		},
		drivingLicenseNumber: {
			type : String,
			trim : true,
			uppercase: true
		},
		uniqueDriverNumber: {
			type : String,
			trim : true
		},
		drivingLicenseExpiryDate: Date,
		isDrivingLicenseAuthorityLetterNeeded: Boolean,
		isBackgroundVerificationNeeded: Boolean,
		isDriverIdentifierDocumentSubmitted: Boolean,
		wwvpRegistrationExpiryDate: Date,
		mobileNumber: String,
		backgroundVerificationSource: String,
		identifier1: String,
		identifier2: String,
		identifier3: String,
		councilNumber: String,
		privateHireDriverLicenseExpiryDate: Date,
		hackneyCarriageDriverLicenseExpiryDate : Date,
		permitsProvided: Array,
		isVehicleTslCertificateNeeded: Boolean,
		driverUniqueCode: String,
		isVevoDocSubmitted: Boolean,
		isOperatorAccreditionNeeded: Boolean,
		council: String
	},

	operator: {
		name: {
			type : String,
			trim : true
		},
		branchNumber: String,
		accountNumber: {
			type : String,
			uppercase : true
		},
		birthCertificateNumber: String,
		mobileNumber: String,
		citizenShipCertificateNumber: String,
		identifier1: String,
		identifier2: String,
		identifier3: String,
		userVatNeeded: Boolean,
		vatNumber: String,
		isVatConsentAccepted: Boolean,
		isABNConsentAccepted: Boolean
	},

	car: {
		carLicenseNumber: {
			type: String,
			uppercase: true,
			trim : true,
			required: [true, `Please enter a valid Car License Number (alphabets and/or numbers)`]
		},
		manufacturer: String,
		model: String,
		color: String,
		colorValue: String,
		vehicleCategory: String,
		vehicleInsuranceNumber: String,
		vehicleInsuranceExpiryDate: Date,
		privateHireVehicleLicenseExpiryDate: Date,
		vehiclePermitNumber: String,
		physicalVerificationExpiryDate: Date,
		motorInjuryInsuranceNumber: String,
		motorInjuryInsuranceExpiryDate: Date,
		isMotorInjuryInsuranceNeeded: Boolean,
		isPhysicalVerificationNeeded: Boolean,
		identifier1: String,
		identifier2: String,
		identifier3: String,
		imsAuditId: Number,
		vehicleCouncil: String,
		isSupportingInsuranceNeeded: Boolean,
		motCertificateExpiryDate: Date,
		vehicleLogbookType: String,
		vehicleLogbookExpiryDate: Date,
		manufactureYear: String,
		hackneyCarriageVehicleLicenseExpiryDate : Date
	},

	businessType: String,

	status: {
		type: String,
		default: "pending"
	},

	location: {
		type: Object
	},

	imsData: {
		type: Object
	},

	imsResponse: {
		type: Object
	},

	attachmentType: {
		type:String,
		default: "inventory"
	},

	createdByUserEmail: String,

	createByUserSugarId: String,

	statusReason: String,

	cancellationReason: String,

	externalVerificationResponses: Object,

	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	tatBreakdown: Object,
	ticketVerificationStatus: Object,
	attributeVerificationStatus: {
		type: Object,
		default: {}
	},

	digitisationIds: Object

}, {
	timestamps: true
});

const ApplicationModel = mongoose.model(applicationSchema);

const applicationConfig = ["pending","resubmit","docVerified","failed"];

module.exports = {
	cancelApplication: async function(user, applicationId, cancellationReason){
		let application = await ApplicationModel.findById(mongoose.Types.ObjectId(applicationId)).exec();
		if(!application){
			throw new Error(applicationId + " Not Found");
		}
		if(applicationConfig.includes(_.get(applicationId, `status`))){
			application.status = 'cancelled';
			application.cancellationReason = 'Driver not Responding';
			return application.save();
		} else {
			throw new Error("Application is in invalid state for cancellation");
		}
	}
}


