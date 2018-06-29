"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Asset = (function () {
    function Asset() {
    }
    return Asset;
}());
exports.Asset = Asset;
var Participant = (function () {
    function Participant() {
    }
    return Participant;
}());
exports.Participant = Participant;
var Transaction = (function () {
    function Transaction() {
    }
    return Transaction;
}());
exports.Transaction = Transaction;
var Event = (function () {
    function Event() {
    }
    return Event;
}());
exports.Event = Event;
var Registry = (function (_super) {
    __extends(Registry, _super);
    function Registry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Registry;
}(Asset));
exports.Registry = Registry;
var AssetRegistry = (function (_super) {
    __extends(AssetRegistry, _super);
    function AssetRegistry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AssetRegistry;
}(Registry));
exports.AssetRegistry = AssetRegistry;
var ParticipantRegistry = (function (_super) {
    __extends(ParticipantRegistry, _super);
    function ParticipantRegistry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ParticipantRegistry;
}(Registry));
exports.ParticipantRegistry = ParticipantRegistry;
var TransactionRegistry = (function (_super) {
    __extends(TransactionRegistry, _super);
    function TransactionRegistry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TransactionRegistry;
}(Registry));
exports.TransactionRegistry = TransactionRegistry;
var Network = (function (_super) {
    __extends(Network, _super);
    function Network() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Network;
}(Asset));
exports.Network = Network;
var NetworkAdmin = (function (_super) {
    __extends(NetworkAdmin, _super);
    function NetworkAdmin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NetworkAdmin;
}(Participant));
exports.NetworkAdmin = NetworkAdmin;
var HistorianRecord = (function (_super) {
    __extends(HistorianRecord, _super);
    function HistorianRecord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HistorianRecord;
}(Asset));
exports.HistorianRecord = HistorianRecord;
var RegistryTransaction = (function (_super) {
    __extends(RegistryTransaction, _super);
    function RegistryTransaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RegistryTransaction;
}(Transaction));
exports.RegistryTransaction = RegistryTransaction;
var AssetTransaction = (function (_super) {
    __extends(AssetTransaction, _super);
    function AssetTransaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AssetTransaction;
}(RegistryTransaction));
exports.AssetTransaction = AssetTransaction;
var ParticipantTransaction = (function (_super) {
    __extends(ParticipantTransaction, _super);
    function ParticipantTransaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ParticipantTransaction;
}(RegistryTransaction));
exports.ParticipantTransaction = ParticipantTransaction;
var AddAsset = (function (_super) {
    __extends(AddAsset, _super);
    function AddAsset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AddAsset;
}(AssetTransaction));
exports.AddAsset = AddAsset;
var UpdateAsset = (function (_super) {
    __extends(UpdateAsset, _super);
    function UpdateAsset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateAsset;
}(AssetTransaction));
exports.UpdateAsset = UpdateAsset;
var RemoveAsset = (function (_super) {
    __extends(RemoveAsset, _super);
    function RemoveAsset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RemoveAsset;
}(AssetTransaction));
exports.RemoveAsset = RemoveAsset;
var AddParticipant = (function (_super) {
    __extends(AddParticipant, _super);
    function AddParticipant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AddParticipant;
}(ParticipantTransaction));
exports.AddParticipant = AddParticipant;
var UpdateParticipant = (function (_super) {
    __extends(UpdateParticipant, _super);
    function UpdateParticipant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateParticipant;
}(ParticipantTransaction));
exports.UpdateParticipant = UpdateParticipant;
var RemoveParticipant = (function (_super) {
    __extends(RemoveParticipant, _super);
    function RemoveParticipant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RemoveParticipant;
}(ParticipantTransaction));
exports.RemoveParticipant = RemoveParticipant;
var IdentityState;
(function (IdentityState) {
    IdentityState[IdentityState["ISSUED"] = 0] = "ISSUED";
    IdentityState[IdentityState["BOUND"] = 1] = "BOUND";
    IdentityState[IdentityState["ACTIVATED"] = 2] = "ACTIVATED";
    IdentityState[IdentityState["REVOKED"] = 3] = "REVOKED";
})(IdentityState = exports.IdentityState || (exports.IdentityState = {}));
var Identity = (function (_super) {
    __extends(Identity, _super);
    function Identity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Identity;
}(Asset));
exports.Identity = Identity;
var IssueIdentity = (function (_super) {
    __extends(IssueIdentity, _super);
    function IssueIdentity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IssueIdentity;
}(Transaction));
exports.IssueIdentity = IssueIdentity;
var BindIdentity = (function (_super) {
    __extends(BindIdentity, _super);
    function BindIdentity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BindIdentity;
}(Transaction));
exports.BindIdentity = BindIdentity;
var ActivateCurrentIdentity = (function (_super) {
    __extends(ActivateCurrentIdentity, _super);
    function ActivateCurrentIdentity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ActivateCurrentIdentity;
}(Transaction));
exports.ActivateCurrentIdentity = ActivateCurrentIdentity;
var RevokeIdentity = (function (_super) {
    __extends(RevokeIdentity, _super);
    function RevokeIdentity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RevokeIdentity;
}(Transaction));
exports.RevokeIdentity = RevokeIdentity;
var StartBusinessNetwork = (function (_super) {
    __extends(StartBusinessNetwork, _super);
    function StartBusinessNetwork() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StartBusinessNetwork;
}(Transaction));
exports.StartBusinessNetwork = StartBusinessNetwork;
var ResetBusinessNetwork = (function (_super) {
    __extends(ResetBusinessNetwork, _super);
    function ResetBusinessNetwork() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResetBusinessNetwork;
}(Transaction));
exports.ResetBusinessNetwork = ResetBusinessNetwork;
var UpdateBusinessNetwork = (function (_super) {
    __extends(UpdateBusinessNetwork, _super);
    function UpdateBusinessNetwork() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateBusinessNetwork;
}(Transaction));
exports.UpdateBusinessNetwork = UpdateBusinessNetwork;
var SetLogLevel = (function (_super) {
    __extends(SetLogLevel, _super);
    function SetLogLevel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SetLogLevel;
}(Transaction));
exports.SetLogLevel = SetLogLevel;
