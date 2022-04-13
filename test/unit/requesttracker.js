import { expect } from "chai";
import { RequestTracker } from "../../models/requesttracker.js";

describe('RequestTracker', function() {

    this.beforeEach(() => {
        RequestTracker._data = {};
    });

    describe("#new", function() {
        it("starts empty", function() {
            expect(RequestTracker._data["124"]).to.be.undefined;
        });

        it("creates a new entry", function() {
            RequestTracker.new("124");
            expect(RequestTracker._data["124"]).to.not.be.empty;
        });
    });

    describe("#delete", function() {
        it("removes an entry", function() {
            RequestTracker.new('124');
            RequestTracker.delete('124')
            expect(RequestTracker._data["124"]).to.be.undefined;
        });
    });


    describe("#getAllData", function() {
        it("returns undefined if no data is present", function() {
            expect(RequestTracker.getAllData()).to.be.empty;
        });

        it("returns data if data is present", function() {
            RequestTracker.new("124");
            RequestTracker.new("435");
            RequestTracker.new("565");
            expect(RequestTracker.getAllData()).to.not.be.empty;
            expect(RequestTracker.getAllData()).to.have.property("124").and.to.have.property("createdOn");
            expect(RequestTracker.getAllData()).to.have.property("435").and.to.have.property("requests");
            expect(RequestTracker.getAllData()).to.have.property("565").and.to.have.property("createdOn");
        });
    });

    describe("#getData", function() {
        it("returns undefined if no data is present", function() {
            expect(RequestTracker.getData('124')).to.be.undefined;
        });

        it("returns data if data is present", function() {
            RequestTracker.new("124");
            expect(RequestTracker.getData('124')).to.not.be.empty;
            expect(RequestTracker.getData("124")).to.have.property("createdOn");
            expect(RequestTracker.getData("124")).to.have.property("requests");
        });
    });

    describe('#doesExist', function() {
        it("returns false if key doesn't exist", function() {
            expect(RequestTracker.doesExist("124")).to.be.false;
        });

        it("returns true if key does exist", function() {
            RequestTracker._data["124"] = 'asdad';
            expect(RequestTracker.doesExist("124")).to.be.true;
        });
    });
});