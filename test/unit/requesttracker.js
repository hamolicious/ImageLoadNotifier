import { expect } from "chai";
import { requestTracker } from "../../models/requesttracker.js";

describe('RequestTracker', function() {

    this.beforeEach(() => {
        requestTracker._data = {};
    });

    describe("#new", function() {
        it("starts empty", function() {
            expect(requestTracker._data["124"]).to.be.undefined;
        });

        it("creates a new entry", function() {
            requestTracker.new('124')
            expect(requestTracker._data['124']).to.not.be.empty;

        });
    });

    describe("#getData", function() {
        it("returns undefined if no data is present", function() {
            expect(requestTracker.getData('124')).to.be.undefined;
        });

        it("returns data if data is present", function() {
            requestTracker.new("124");
            expect(requestTracker.getData('124')).to.not.be.empty;
            expect(requestTracker.getData("124")).to.have.property("createdOn");
            expect(requestTracker.getData("124")).to.have.property("accessedOn");
        });
    });


    describe('#doesExist', function() {
        it("returns false if key doesn't exist", function() {
            expect(requestTracker.doesExist("124")).to.be.false;
        });

        it("returns true if key does exist", function() {
            requestTracker._data["124"] = 'asdad';
            expect(requestTracker.doesExist("124")).to.be.true;
        });
    });
});