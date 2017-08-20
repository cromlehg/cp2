var Crowdsale = artifacts.require("./Crowdsale.sol");

contract('Crowdsale', function(accounts) {
 
  //============= first owner, function calls from not owner ====================//

  it("first owner: should not change ownership", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[2], {from: accounts[1]});
    }).then(function() {
      return meta.owner.call();
    }).then(function(owner) {
      assert.notEqual(accounts[0], owner, "Owner changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.owner.call().then(function(owner) {
          assert.notEqual(accounts[2], owner, "Owner changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not change start date", function() {
    var meta;
    var newStart = 1502463457;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(newStart, {from: accounts[1]});
    }).then(function() {
      return meta.start.call();
    }).then(function(start) {
      assert.notEqual(newStart, start, "Start date changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.start.call().then(function(start) {
          assert.notEqual(newStart, start, "Start date changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not paused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.pause({from: accounts[1]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.notEqual(true, paused, "paused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.paused.call().then(function(paused) {
          assert.notEqual(true, paused, "paused");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should paused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.pause({from: accounts[0]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.equal(true, paused, "not paused");
    });
  });

  it("first owner: should not paused when paused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.pause({from: accounts[0]});
    }).then(function() {
      assert.equal(true, false, "paused when paused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return assert.equal(true, true, "paused when paused");
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not unpaused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.unpause({from: accounts[1]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.equal(true, paused, "paused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.paused.call().then(function(paused) {
          assert.equal(true, paused, "paused");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should unpaused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.unpause({from: accounts[0]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.equal(false, paused, "not unpaused");
    });
  });

  it("first owner: should not unpaused when unpaused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.unpause({from: accounts[0]});
    }).then(function() {
      assert.equal(true, false, "unpaused when unpaused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return assert.equal(true, true, "unpaused when unpaused");
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not change multisig wallet", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setMultisigWallet(accounts[2], {from: accounts[1]});
    }).then(function() {
      return meta.multisigWallet.call();
    }).then(function(wallet) {
      assert.notEqual(accounts[2], wallet, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.multisigWallet.call().then(function(wallet) {
          assert.notEqual(accounts[2], wallet, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not change bounty wallet", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setBountyTokensWallet(accounts[2], {from: accounts[1]});
    }).then(function() {
      return meta.bountyTokensWallet.call();
    }).then(function(wallet) {
      assert.notEqual(accounts[2], wallet, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.bountyTokensWallet.call().then(function(wallet) {
          assert.notEqual(accounts[2], wallet, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not change founders wallet", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setFoundersTokensWallet(accounts[2], {from: accounts[1]});
    }).then(function() {
      return meta.foundersTokensWallet.call();
    }).then(function(wallet) {
      assert.notEqual(accounts[2], wallet, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.foundersTokensWallet.call().then(function(wallet) {
          assert.notEqual(accounts[2], wallet, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not change founders percent", function() {
    var meta;
    var newFoundersPercent = 30;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setFoundersPercent(newFoundersPercent, {from: accounts[1]});
    }).then(function() {
      return meta.foundersPercent.call();
    }).then(function(foundersPercent) {
      assert.notEqual(newFoundersPercent, foundersPercent, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.foundersPercent.call().then(function(foundersPercent) {
          assert.notEqual(newFoundersPercent, foundersPercent, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not change bounty percent", function() {
    var meta;
    var newBountyPercent = 30;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setBountyPercent(newBountyPercent, {from: accounts[1]});
    }).then(function() {
      return meta.bountyPercent.call();
    }).then(function(bountyPercent) {
      assert.notEqual(newBountyPercent, bountyPercent, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.bountyPercent.call().then(function(bountyPercent) {
          assert.notEqual(newBountyPercent, bountyPercent, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not add stage", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addStage(1, 12, 10, {from: accounts[1]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.notEqual(0, stagesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.stagesCount().then(function(stagesCount) {
          assert.equal(0, stagesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  var newPeriod1 = 7;
  var newHardcap1 = 850000000000000000000;
  var newPrice1 = 1700000000000000;

  var newPeriod2 = 7;
  var newHardcap2 = 2550000000000000000000;
  var newPrice2 = 2550000000000000;

  var newPeriod3 = 7;
  var newHardcap3 = 8160000000000000000000;
  var newPrice3 = 2720000000000000;

  var newPeriod4 = 21;
  var newHardcap4 = 49300000000000000000000;
  var newPrice4 = 3400000000000000;

  var newPeriod5 = 41;
  var newHardcap5 = 59300000000000000000000;
  var newPrice5 = 7400000000000000;

  var newPeriod5c = 413;
  var newHardcap5c = 59300000000000000000012;
  var newPrice5c = 7400000000009999;



  it("first owner: should add stage 1", function() {
    var meta;
    var newPeriod = newPeriod1;
    var newHardcap = newHardcap1;
    var newPrice = newPrice1;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addStage(newPeriod, newHardcap, newPrice, {from: accounts[0]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(1, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(newHardcap, totalHardCap, "total hardcap not changed");
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod, "stage period wrong");
      assert.equal(stages[1], newHardcap, "stage hardcap wrong");
      assert.equal(stages[2], newPrice, "stage price wrong");
      assert.equal(stages[3], 0, "stage invested wrong");
      assert.equal(stages[4], 0, "stage closed wrong");
    });
  });

  it("first owner: should not remove stage", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.removeStage(0, {from: accounts[1]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.notEqual(1, stagesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.stagesCount().then(function(stagesCount) {
          assert.equal(1, stagesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });


  it("first owner: should not change stage", function() {
    var meta;
    var newPeriod = newPeriod5c;
    var newHardcap = newHardcap5c;
    var newPrice = newPrice5c;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.changeStage(0, newPeriod, newHardcap, newPrice, {from: accounts[1]});
    }).then(function() {
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
      assert.equal(stages[2], newPrice1, "stage 1 price wrong");
      assert.equal(stages[3], 0, "stage 1 invested wrong");
      assert.equal(stages[4], 0, "stage 1 closed wrong");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.stages(0).then(function(stages) {
         assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
         assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
         assert.equal(stages[2], newPrice1, "stage 1 price wrong");
         assert.equal(stages[3], 0, "stage 1 invested wrong");
         assert.equal(stages[4], 0, "stage 1 closed wrong");
     });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should add stage 2", function() {
    var meta;
    var newPeriod = newPeriod2;
    var newHardcap = newHardcap2;
    var newPrice = newPrice2;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addStage(newPeriod, newHardcap, newPrice, {from: accounts[0]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(2, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(newHardcap1 + newHardcap2, totalHardCap, "total hardcap not changed");
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
      assert.equal(stages[2], newPrice1, "stage 1 price wrong");
      assert.equal(stages[3], 0, "stage 1 invested wrong");
      assert.equal(stages[4], 0, "stage 1 closed wrong");
      return meta.stages(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newHardcap2, "stage 2 hardcap wrong");
      assert.equal(stages[2], newPrice2, "stage 2 price wrong");
      assert.equal(stages[3], 0, "stage 2 invested wrong");
      assert.equal(stages[4], 0, "stage 2 closed wrong");
    });
  });

  it("first owner: should add stage 4", function() {
    var meta;
    var newPeriod = newPeriod4;
    var newHardcap = newHardcap4;
    var newPrice = newPrice4;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addStage(newPeriod, newHardcap, newPrice, {from: accounts[0]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(3, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod4, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(newHardcap1 + newHardcap2 + newHardcap4, totalHardCap, "total hardcap not changed");
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
      assert.equal(stages[2], newPrice1, "stage 1 price wrong");
      assert.equal(stages[3], 0, "stage 1 invested wrong");
      assert.equal(stages[4], 0, "stage 1 closed wrong");
      return meta.stages(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newHardcap2, "stage 2 hardcap wrong");
      assert.equal(stages[2], newPrice2, "stage 2 price wrong");
      assert.equal(stages[3], 0, "stage 2 invested wrong");
      assert.equal(stages[4], 0, "stage 2 closed wrong");
      return meta.stages(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newHardcap4, "stage 4 hardcap wrong");
      assert.equal(stages[2], newPrice4, "stage 4 price wrong");
      assert.equal(stages[3], 0, "stage 4 invested wrong");
      assert.equal(stages[4], 0, "stage 4 closed wrong");
    });
  });

  it("first owner: should not insert stage", function() {
    var meta;
    var newPeriod = newPeriod3;
    var newHardcap = newHardcap3;
    var newPrice = newPrice3;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.insertStage(1, newPeriod, newHardcap, newPrice, {from: accounts[1]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.notEqual(3, stagesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.stagesCount().then(function(stagesCount) {
          assert.equal(3, stagesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });


  it("first owner: should insert stage 3", function() {
    var meta;
    var newPeriod = newPeriod3;
    var newHardcap = newHardcap3;
    var newPrice = newPrice3;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.insertStage(1, newPeriod, newHardcap, newPrice, {from: accounts[0]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(4, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(newHardcap1 + newHardcap2 + newHardcap3 + newHardcap4, totalHardCap, "total hardcap not changed");
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
      assert.equal(stages[2], newPrice1, "stage 1 price wrong");
      assert.equal(stages[3], 0, "stage 1 invested wrong");
      assert.equal(stages[4], 0, "stage 1 closed wrong");
      return meta.stages(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newHardcap2, "stage 2 hardcap wrong");
      assert.equal(stages[2], newPrice2, "stage 2 price wrong");
      assert.equal(stages[3], 0, "stage 2 invested wrong");
      assert.equal(stages[4], 0, "stage 2 closed wrong");
      return meta.stages(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newHardcap3, "stage 3 hardcap wrong");
      assert.equal(stages[2], newPrice3, "stage 3 price wrong");
      assert.equal(stages[3], 0, "stage 3 invested wrong");
      assert.equal(stages[4], 0, "stage 3 closed wrong");
      return meta.stages(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newHardcap4, "stage 4 hardcap wrong");
      assert.equal(stages[2], newPrice4, "stage 4 price wrong");
      assert.equal(stages[3], 0, "stage 4 invested wrong");
      assert.equal(stages[4], 0, "stage 4 closed wrong");
    });
  });

  it("first owner: should insert stage 5 in not right place", function() {
    var meta;
    var newPeriod = newPeriod5;
    var newHardcap = newHardcap5;
    var newPrice = newPrice5;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.insertStage(2, newPeriod, newHardcap, newPrice, {from: accounts[0]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(5, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4 + newPeriod5, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(newHardcap1 + newHardcap2 + newHardcap3 + newHardcap4 + newHardcap5, totalHardCap, "total hardcap not changed");
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
      assert.equal(stages[2], newPrice1, "stage 1 price wrong");
      assert.equal(stages[3], 0, "stage 1 invested wrong");
      assert.equal(stages[4], 0, "stage 1 closed wrong");
      return meta.stages(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newHardcap2, "stage 2 hardcap wrong");
      assert.equal(stages[2], newPrice2, "stage 2 price wrong");
      assert.equal(stages[3], 0, "stage 2 invested wrong");
      assert.equal(stages[4], 0, "stage 2 closed wrong");
      return meta.stages(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newHardcap3, "stage 3 hardcap wrong");
      assert.equal(stages[2], newPrice3, "stage 3 price wrong");
      assert.equal(stages[3], 0, "stage 3 invested wrong");
      assert.equal(stages[4], 0, "stage 3 closed wrong");
      return meta.stages(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod5, "stage 5 period wrong");
      assert.equal(stages[1], newHardcap5, "stage 5 hardcap wrong");
      assert.equal(stages[2], newPrice5, "stage 5 price wrong");
      assert.equal(stages[3], 0, "stage 5 invested wrong");
      assert.equal(stages[4], 0, "stage 5 closed wrong");
      return meta.stages(4);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newHardcap4, "stage 4 hardcap wrong");
      assert.equal(stages[2], newPrice4, "stage 4 price wrong");
      assert.equal(stages[3], 0, "stage 4 invested wrong");
      assert.equal(stages[4], 0, "stage 4 closed wrong");
    });
  });

  it("first owner: should changes stage 5 in not right place", function() {
    var meta;
    var newPeriod = newPeriod5c;
    var newHardcap = newHardcap5c;
    var newPrice = newPrice5c;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.changeStage(3, newPeriod, newHardcap, newPrice, {from: accounts[0]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(5, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4 + newPeriod5c, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(newHardcap1 + newHardcap2 + newHardcap3 + newHardcap4 + newHardcap5c, totalHardCap, "total hardcap not changed");
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
      assert.equal(stages[2], newPrice1, "stage 1 price wrong");
      assert.equal(stages[3], 0, "stage 1 invested wrong");
      assert.equal(stages[4], 0, "stage 1 closed wrong");
      return meta.stages(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newHardcap2, "stage 2 hardcap wrong");
      assert.equal(stages[2], newPrice2, "stage 2 price wrong");
      assert.equal(stages[3], 0, "stage 2 invested wrong");
      assert.equal(stages[4], 0, "stage 2 closed wrong");
      return meta.stages(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newHardcap3, "stage 3 hardcap wrong");
      assert.equal(stages[2], newPrice3, "stage 3 price wrong");
      assert.equal(stages[3], 0, "stage 3 invested wrong");
      assert.equal(stages[4], 0, "stage 3 closed wrong");
      return meta.stages(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod5c, "stage 5c period wrong");
      assert.equal(stages[1], newHardcap5c, "stage 5c hardcap wrong");
      assert.equal(stages[2], newPrice5c, "stage 5c price wrong");
      assert.equal(stages[3], 0, "stage 5c invested wrong");
      assert.equal(stages[4], 0, "stage 5c closed wrong");
      return meta.stages(4);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newHardcap4, "stage 4 hardcap wrong");
      assert.equal(stages[2], newPrice4, "stage 4 price wrong");
      assert.equal(stages[3], 0, "stage 4 invested wrong");
      assert.equal(stages[4], 0, "stage 4 closed wrong");
    });
  });

  it("first owner: remove stage 5 from not right place", function() {
    var meta;
    var newPeriod = newPeriod5;
    var newHardcap = newHardcap5;
    var newPrice = newPrice5;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.removeStage(3, {from: accounts[0]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(4, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(newHardcap1 + newHardcap2 + newHardcap3 + newHardcap4, totalHardCap, "total hardcap not changed");
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
      assert.equal(stages[2], newPrice1, "stage 1 price wrong");
      assert.equal(stages[3], 0, "stage 1 invested wrong");
      assert.equal(stages[4], 0, "stage 1 closed wrong");
      return meta.stages(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newHardcap2, "stage 2 hardcap wrong");
      assert.equal(stages[2], newPrice2, "stage 2 price wrong");
      assert.equal(stages[3], 0, "stage 2 invested wrong");
      assert.equal(stages[4], 0, "stage 2 closed wrong");
      return meta.stages(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newHardcap3, "stage 3 hardcap wrong");
      assert.equal(stages[2], newPrice3, "stage 3 price wrong");
      assert.equal(stages[3], 0, "stage 3 invested wrong");
      assert.equal(stages[4], 0, "stage 3 closed wrong");
      return meta.stages(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newHardcap4, "stage 4 hardcap wrong");
      assert.equal(stages[2], newPrice4, "stage 4 price wrong");
      assert.equal(stages[3], 0, "stage 4 invested wrong");
      assert.equal(stages[4], 0, "stage 4 closed wrong");
    });
  });

  // TODO: should check total values - and another not tests too
  it("first owner: should not clear stages", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.clearStages({from: accounts[1]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.notEqual(4, stagesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.stagesCount().then(function(stagesCount) {
          assert.equal(4, stagesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should clear stages", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.clearStages({from: accounts[0]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(0, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(0, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(0, totalHardCap, "total hardcap not changed");
    });
  });

  // inverse of ownership from 0 to 1 and run all access tests again

  it("first owner: should change ownership", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[1], {from: accounts[0]});
    }).then(function() {
      return meta.owner.call();
    }).then(function(owner) {
      assert.equal(owner, accounts[1], "Owner not changed");
    });
  });

  it("second owner: should not change ownership", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[2], {from: accounts[0]});
    }).then(function() {
      return meta.owner.call();
    }).then(function(owner) {
      assert.notEqual(accounts[0], owner, "Owner changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.owner.call().then(function(owner) {
          assert.notEqual(accounts[2], owner, "Owner changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change start date", function() {
    var meta;
    var newStart = 1502463457;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(newStart, {from: accounts[0]});
    }).then(function() {
      return meta.start.call();
    }).then(function(start) {
      assert.notEqual(newStart, start, "Start date changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.start.call().then(function(start) {
          assert.notEqual(newStart, start, "Start date changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not paused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.pause({from: accounts[0]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.notEqual(true, paused, "paused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.paused.call().then(function(paused) {
          assert.notEqual(true, paused, "paused");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should paused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.pause({from: accounts[1]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.equal(true, paused, "not paused");
    });
  });

  it("second owner: should not paused when paused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.pause({from: accounts[1]});
    }).then(function() {
      assert.equal(true, false, "paused when paused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return assert.equal(true, true, "paused when paused");
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not unpaused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.unpause({from: accounts[0]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.equal(true, paused, "paused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.paused.call().then(function(paused) {
          assert.equal(true, paused, "paused");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should unpaused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.unpause({from: accounts[1]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.equal(false, paused, "not unpaused");
    });
  });

  it("second owner: should not unpaused when unpaused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.unpause({from: accounts[1]});
    }).then(function() {
      assert.equal(true, false, "unpaused when unpaused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return assert.equal(true, true, "unpaused when unpaused");
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change multisig wallet", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setMultisigWallet(accounts[2], {from: accounts[0]});
    }).then(function() {
      return meta.multisigWallet.call();
    }).then(function(wallet) {
      assert.notEqual(accounts[2], wallet, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.multisigWallet.call().then(function(wallet) {
          assert.notEqual(accounts[2], wallet, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change bounty wallet", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setBountyTokensWallet(accounts[2], {from: accounts[0]});
    }).then(function() {
      return meta.bountyTokensWallet.call();
    }).then(function(wallet) {
      assert.notEqual(accounts[2], wallet, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.bountyTokensWallet.call().then(function(wallet) {
          assert.notEqual(accounts[2], wallet, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change founders wallet", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setFoundersTokensWallet(accounts[2], {from: accounts[0]});
    }).then(function() {
      return meta.foundersTokensWallet.call();
    }).then(function(wallet) {
      assert.notEqual(accounts[2], wallet, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.foundersTokensWallet.call().then(function(wallet) {
          assert.notEqual(accounts[2], wallet, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change founders percent", function() {
    var meta;
    var newFoundersPercent = 30;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setFoundersPercent(newFoundersPercent, {from: accounts[0]});
    }).then(function() {
      return meta.foundersPercent.call();
    }).then(function(foundersPercent) {
      assert.notEqual(newFoundersPercent, foundersPercent, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.foundersPercent.call().then(function(foundersPercent) {
          assert.notEqual(newFoundersPercent, foundersPercent, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change bounty percent", function() {
    var meta;
    var newBountyPercent = 30;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setBountyPercent(newBountyPercent, {from: accounts[0]});
    }).then(function() {
      return meta.bountyPercent.call();
    }).then(function(bountyPercent) {
      assert.notEqual(newBountyPercent, bountyPercent, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.bountyPercent.call().then(function(bountyPercent) {
          assert.notEqual(newBountyPercent, bountyPercent, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not add stage", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addStage(1, 12, 10, {from: accounts[0]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.notEqual(0, stagesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.stagesCount().then(function(stagesCount) {
          assert.equal(0, stagesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });


  it("second owner: should add stage 1", function() {
    var meta;
    var newPeriod = newPeriod1;
    var newHardcap = newHardcap1;
    var newPrice = newPrice1;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addStage(newPeriod, newHardcap, newPrice, {from: accounts[1]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(1, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(newHardcap, totalHardCap, "total hardcap not changed");
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod, "stage period wrong");
      assert.equal(stages[1], newHardcap, "stage hardcap wrong");
      assert.equal(stages[2], newPrice, "stage price wrong");
      assert.equal(stages[3], 0, "stage invested wrong");
      assert.equal(stages[4], 0, "stage closed wrong");
    });
  });

  it("second owner: should not remove stage", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.removeStage(0, {from: accounts[0]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.notEqual(1, stagesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.stagesCount().then(function(stagesCount) {
          assert.equal(1, stagesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });


  it("second owner: should not change stage", function() {
    var meta;
    var newPeriod = newPeriod5c;
    var newHardcap = newHardcap5c;
    var newPrice = newPrice5c;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.changeStage(0, newPeriod, newHardcap, newPrice, {from: accounts[0]});
    }).then(function() {
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
      assert.equal(stages[2], newPrice1, "stage 1 price wrong");
      assert.equal(stages[3], 0, "stage 1 invested wrong");
      assert.equal(stages[4], 0, "stage 1 closed wrong");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.stages(0).then(function(stages) {
         assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
         assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
         assert.equal(stages[2], newPrice1, "stage 1 price wrong");
         assert.equal(stages[3], 0, "stage 1 invested wrong");
         assert.equal(stages[4], 0, "stage 1 closed wrong");
     });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should add stage 2", function() {
    var meta;
    var newPeriod = newPeriod2;
    var newHardcap = newHardcap2;
    var newPrice = newPrice2;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addStage(newPeriod, newHardcap, newPrice, {from: accounts[1]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(2, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(newHardcap1 + newHardcap2, totalHardCap, "total hardcap not changed");
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
      assert.equal(stages[2], newPrice1, "stage 1 price wrong");
      assert.equal(stages[3], 0, "stage 1 invested wrong");
      assert.equal(stages[4], 0, "stage 1 closed wrong");
      return meta.stages(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newHardcap2, "stage 2 hardcap wrong");
      assert.equal(stages[2], newPrice2, "stage 2 price wrong");
      assert.equal(stages[3], 0, "stage 2 invested wrong");
      assert.equal(stages[4], 0, "stage 2 closed wrong");
    });
  });

  it("second owner: should add stage 4", function() {
    var meta;
    var newPeriod = newPeriod4;
    var newHardcap = newHardcap4;
    var newPrice = newPrice4;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addStage(newPeriod, newHardcap, newPrice, {from: accounts[1]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(3, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod4, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(newHardcap1 + newHardcap2 + newHardcap4, totalHardCap, "total hardcap not changed");
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
      assert.equal(stages[2], newPrice1, "stage 1 price wrong");
      assert.equal(stages[3], 0, "stage 1 invested wrong");
      assert.equal(stages[4], 0, "stage 1 closed wrong");
      return meta.stages(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newHardcap2, "stage 2 hardcap wrong");
      assert.equal(stages[2], newPrice2, "stage 2 price wrong");
      assert.equal(stages[3], 0, "stage 2 invested wrong");
      assert.equal(stages[4], 0, "stage 2 closed wrong");
      return meta.stages(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newHardcap4, "stage 4 hardcap wrong");
      assert.equal(stages[2], newPrice4, "stage 4 price wrong");
      assert.equal(stages[3], 0, "stage 4 invested wrong");
      assert.equal(stages[4], 0, "stage 4 closed wrong");
    });
  });

  it("second owner: should not insert stage", function() {
    var meta;
    var newPeriod = newPeriod3;
    var newHardcap = newHardcap3;
    var newPrice = newPrice3;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.insertStage(1, newPeriod, newHardcap, newPrice, {from: accounts[0]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.notEqual(3, stagesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.stagesCount().then(function(stagesCount) {
          assert.equal(3, stagesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });


  it("second owner: should insert stage 3", function() {
    var meta;
    var newPeriod = newPeriod3;
    var newHardcap = newHardcap3;
    var newPrice = newPrice3;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.insertStage(1, newPeriod, newHardcap, newPrice, {from: accounts[1]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(4, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(newHardcap1 + newHardcap2 + newHardcap3 + newHardcap4, totalHardCap, "total hardcap not changed");
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
      assert.equal(stages[2], newPrice1, "stage 1 price wrong");
      assert.equal(stages[3], 0, "stage 1 invested wrong");
      assert.equal(stages[4], 0, "stage 1 closed wrong");
      return meta.stages(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newHardcap2, "stage 2 hardcap wrong");
      assert.equal(stages[2], newPrice2, "stage 2 price wrong");
      assert.equal(stages[3], 0, "stage 2 invested wrong");
      assert.equal(stages[4], 0, "stage 2 closed wrong");
      return meta.stages(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newHardcap3, "stage 3 hardcap wrong");
      assert.equal(stages[2], newPrice3, "stage 3 price wrong");
      assert.equal(stages[3], 0, "stage 3 invested wrong");
      assert.equal(stages[4], 0, "stage 3 closed wrong");
      return meta.stages(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newHardcap4, "stage 4 hardcap wrong");
      assert.equal(stages[2], newPrice4, "stage 4 price wrong");
      assert.equal(stages[3], 0, "stage 4 invested wrong");
      assert.equal(stages[4], 0, "stage 4 closed wrong");
    });
  });

  it("second owner: should insert stage 5 in not right place", function() {
    var meta;
    var newPeriod = newPeriod5;
    var newHardcap = newHardcap5;
    var newPrice = newPrice5;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.insertStage(2, newPeriod, newHardcap, newPrice, {from: accounts[1]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(5, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4 + newPeriod5, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(newHardcap1 + newHardcap2 + newHardcap3 + newHardcap4 + newHardcap5, totalHardCap, "total hardcap not changed");
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
      assert.equal(stages[2], newPrice1, "stage 1 price wrong");
      assert.equal(stages[3], 0, "stage 1 invested wrong");
      assert.equal(stages[4], 0, "stage 1 closed wrong");
      return meta.stages(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newHardcap2, "stage 2 hardcap wrong");
      assert.equal(stages[2], newPrice2, "stage 2 price wrong");
      assert.equal(stages[3], 0, "stage 2 invested wrong");
      assert.equal(stages[4], 0, "stage 2 closed wrong");
      return meta.stages(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newHardcap3, "stage 3 hardcap wrong");
      assert.equal(stages[2], newPrice3, "stage 3 price wrong");
      assert.equal(stages[3], 0, "stage 3 invested wrong");
      assert.equal(stages[4], 0, "stage 3 closed wrong");
      return meta.stages(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod5, "stage 5 period wrong");
      assert.equal(stages[1], newHardcap5, "stage 5 hardcap wrong");
      assert.equal(stages[2], newPrice5, "stage 5 price wrong");
      assert.equal(stages[3], 0, "stage 5 invested wrong");
      assert.equal(stages[4], 0, "stage 5 closed wrong");
      return meta.stages(4);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newHardcap4, "stage 4 hardcap wrong");
      assert.equal(stages[2], newPrice4, "stage 4 price wrong");
      assert.equal(stages[3], 0, "stage 4 invested wrong");
      assert.equal(stages[4], 0, "stage 4 closed wrong");
    });
  });

  it("second owner: should changes stage 5 in not right place", function() {
    var meta;
    var newPeriod = newPeriod5c;
    var newHardcap = newHardcap5c;
    var newPrice = newPrice5c;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.changeStage(3, newPeriod, newHardcap, newPrice, {from: accounts[1]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(5, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4 + newPeriod5c, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(newHardcap1 + newHardcap2 + newHardcap3 + newHardcap4 + newHardcap5c, totalHardCap, "total hardcap not changed");
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
      assert.equal(stages[2], newPrice1, "stage 1 price wrong");
      assert.equal(stages[3], 0, "stage 1 invested wrong");
      assert.equal(stages[4], 0, "stage 1 closed wrong");
      return meta.stages(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newHardcap2, "stage 2 hardcap wrong");
      assert.equal(stages[2], newPrice2, "stage 2 price wrong");
      assert.equal(stages[3], 0, "stage 2 invested wrong");
      assert.equal(stages[4], 0, "stage 2 closed wrong");
      return meta.stages(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newHardcap3, "stage 3 hardcap wrong");
      assert.equal(stages[2], newPrice3, "stage 3 price wrong");
      assert.equal(stages[3], 0, "stage 3 invested wrong");
      assert.equal(stages[4], 0, "stage 3 closed wrong");
      return meta.stages(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod5c, "stage 5c period wrong");
      assert.equal(stages[1], newHardcap5c, "stage 5c hardcap wrong");
      assert.equal(stages[2], newPrice5c, "stage 5c price wrong");
      assert.equal(stages[3], 0, "stage 5c invested wrong");
      assert.equal(stages[4], 0, "stage 5c closed wrong");
      return meta.stages(4);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newHardcap4, "stage 4 hardcap wrong");
      assert.equal(stages[2], newPrice4, "stage 4 price wrong");
      assert.equal(stages[3], 0, "stage 4 invested wrong");
      assert.equal(stages[4], 0, "stage 4 closed wrong");
    });
  });

  it("second owner: remove stage 5 from not right place", function() {
    var meta;
    var newPeriod = newPeriod5;
    var newHardcap = newHardcap5;
    var newPrice = newPrice5;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.removeStage(3, {from: accounts[1]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(4, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(newHardcap1 + newHardcap2 + newHardcap3 + newHardcap4, totalHardCap, "total hardcap not changed");
      return meta.stages(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newHardcap1, "stage 1 hardcap wrong");
      assert.equal(stages[2], newPrice1, "stage 1 price wrong");
      assert.equal(stages[3], 0, "stage 1 invested wrong");
      assert.equal(stages[4], 0, "stage 1 closed wrong");
      return meta.stages(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newHardcap2, "stage 2 hardcap wrong");
      assert.equal(stages[2], newPrice2, "stage 2 price wrong");
      assert.equal(stages[3], 0, "stage 2 invested wrong");
      assert.equal(stages[4], 0, "stage 2 closed wrong");
      return meta.stages(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newHardcap3, "stage 3 hardcap wrong");
      assert.equal(stages[2], newPrice3, "stage 3 price wrong");
      assert.equal(stages[3], 0, "stage 3 invested wrong");
      assert.equal(stages[4], 0, "stage 3 closed wrong");
      return meta.stages(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newHardcap4, "stage 4 hardcap wrong");
      assert.equal(stages[2], newPrice4, "stage 4 price wrong");
      assert.equal(stages[3], 0, "stage 4 invested wrong");
      assert.equal(stages[4], 0, "stage 4 closed wrong");
    });
  });

  // TODO: should check total values - and another not tests too
  it("second owner: should not clear stages", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.clearStages({from: accounts[0]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.notEqual(4, stagesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.stagesCount().then(function(stagesCount) {
          assert.equal(4, stagesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should clear stages", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.clearStages({from: accounts[1]});
    }).then(function() {
      return meta.stagesCount();
    }).then(function(stagesCount) {
      assert.equal(0, stagesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(0, totalPeriod, "total period not changed");
      return meta.totalHardCap.call();
    }).then(function(totalHardCap) {
      assert.equal(0, totalHardCap, "total hardcap not changed");
    });
  });

  it("second owner: should change ownership", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[0], {from: accounts[1]});
    }).then(function() {
      return meta.owner.call();
    }).then(function(owner) {
      assert.equal(owner, accounts[0], "Owner not changed");
    });
  });


//
// state now cleared - now pass control to second account,
// and configure to minimodel and test it
// 
// -- and pass tests for change wallets and percents!!!
//
//
//
//
//
//
  it("second owner: should change ownership", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[1], {from: accounts[0]});
    }).then(function() {
      return meta.owner.call();
    }).then(function(owner) {
      assert.equal(owner, accounts[1], "Owner not changed");
    });
  });



//на вот этот адрес 0x74e4270a4c1833c99c3801a97c7311f0bbb405b3

  // should add stage +
  // should not change stage + 
  // should not clear stages
  // should not remove stage +
  // should not insert stage +
  // clear stages
  // should add stage
  // should add second stage
  // should insert stage after 0
  // should insert second stage after 0
  // should change stage
  // should remove stage

// change wallets and percents tests

  //============= first owner, function calls from owner ====================//
  // set pause, set unpause tested above
/*
  it("first owner: should set start date", function() {
    var meta;
    var newStart = 1502463457;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(newStart, {from: accounts[0]});
    }).then(function() {
      return meta.start.call();
    }).then(function(start) {
      assert.equal(newStart, start, "Start date not changed");
    });
  });

  it("first owner: should set period", function() {
    var meta;
    var newPeriod = 990;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setPeriod(newPeriod, {from: accounts[0]});
    }).then(function() {
      return meta.period.call();
    }).then(function(period) {
      assert.equal(newPeriod, period, "Period not changed");
    });
  });

  it("first owner: should change wallet", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setWallet(accounts[2], {from: accounts[0]});
    }).then(function() {
      return meta.wallet.call();
    }).then(function(wallet) {
      assert.equal(accounts[2], wallet, "Wallet changed");
    });
  });

  it("first owner: should change ownership", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[4], {from: accounts[0]});
    }).then(function() {
      return meta.owner.call();
    }).then(function(owner) {
      assert.equal(owner, accounts[4], "Owner not changed");
    });
  });

  //============= second owner, function calls from owner ====================//

  it("second owner: should change ownership", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[1], {from: accounts[4]});
    }).then(function() {
      return meta.owner.call();
    }).then(function(owner) {
      assert.equal(owner, accounts[1], "Owner not changed");
    });
  });

  it("second owner: should set start date", function() {
    var meta;
    var newStart = 1502463457;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(newStart, {from: accounts[1]});
    }).then(function() {
      return meta.start.call();
    }).then(function(start) {
      assert.equal(newStart, start, "Start date not changed");
    });
  });

  it("second owner: should set period", function() {
    var meta;
    var newPeriod = 999;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setPeriod(newPeriod, {from: accounts[1]});
    }).then(function() {
      return meta.period.call();
    }).then(function(period) {
      assert.equal(newPeriod, period, "Period not changed");
    });
  });

  it("second owner: should change wallet", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setWallet(accounts[0], {from: accounts[1]});
    }).then(function() {
      return meta.wallet.call();
    }).then(function(wallet) {
      assert.equal(accounts[0], wallet, "Wallet changed");
    });
  });


  //============= second owner, function calls not from owner ====================//

  it("second owner: should not change ownership", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[2], {from: accounts[0]});
    }).then(function() {
      return meta.owner.call();
    }).then(function(owner) {
      assert.notEqual(accounts[2], owner, "Owner changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.owner.call().then(function(owner) {
          assert.notEqual(accounts[2], owner, "Owner changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change start date", function() {
    var meta;
    var newStart = 1502463498;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(newStart, {from: accounts[0]});
    }).then(function() {
      return meta.start.call();
    }).then(function(start) {
      assert.notEqual(newStart, start, "Start date changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.start.call().then(function(start) {
          assert.notEqual(newStart, start, "Start date changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change period", function() {
    var meta;
    var newPeriod = 95;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setPeriod(newPeriod, {from: accounts[0]});
    }).then(function() {
      return meta.period.call();
    }).then(function(period) {
      assert.notEqual(newPeriod, period, "Period changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.period.call().then(function(period) {
          assert.notEqual(newPeriod, period, "Period changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not paused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.pause({from: accounts[0]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.notEqual(true, paused, "paused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.paused.call().then(function(paused) {
          assert.notEqual(true, paused, "paused");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should paused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.pause({from: accounts[1]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.equal(true, paused, "not paused");
    });
  });

  it("second owner: should not paused when paused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.pause({from: accounts[1]});
    }).then(function() {
      assert.equal(true, false, "paused when paused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return assert.equal(true, true, "paused when paused");
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not unpaused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.unpause({from: accounts[0]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.equal(true, paused, "paused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.paused.call().then(function(paused) {
          assert.equal(true, paused, "paused");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should unpaused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.unpause({from: accounts[1]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.equal(false, paused, "not unpaused");
    });
  });

  it("second owner: should not unpaused when unpaused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.unpause({from: accounts[1]});
    }).then(function() {
      assert.equal(true, false, "unpaused when unpaused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return assert.equal(true, true, "unpaused when unpaused");
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change wallet", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setWallet(accounts[1], {from: accounts[0]});
    }).then(function() {
      return meta.wallet.call();
    }).then(function(wallet) {
      assert.notEqual(accounts[1], wallet, "wallet changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.wallet.call().then(function(wallet) {
          assert.notEqual(accounts[1], wallet, "paused");
        });
      } else {
        throw e;
      }
    });
  });

  //===================== perform test after secodnd owner tests ==================//
  //   account 0 - old owner
  //   account 1 - current owner
  //   account 2 - wallet
  //   start - 0
  //   period - 0
  //   paused = not
  //

  it("perform after second: should set start date to zero", function() {
    var meta;
    var newStart = 0;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(newStart, {from: accounts[1]});
    }).then(function() {
      return meta.start.call();
    }).then(function(start) {
      assert.equal(newStart, start, "Start date not changed");
    });
  });

  it("perform after second: should change period to zero", function() {
    var meta;
    var newPeriod = 5;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setPeriod(newPeriod, {from: accounts[1]});
    }).then(function() {
      return meta.period.call();
    }).then(function(period) {
      assert.equal(newPeriod, period, "Period not changed");
    });
  });

  it("perform after second: should change wallet to one", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setWallet(accounts[2], {from: accounts[1]});
    }).then(function() {
      return meta.wallet.call();
    }).then(function(wallet) {
      assert.equal(accounts[2], wallet, "Wallet changed");
    });
  });


  //==================== investments time tests ========================//
  //
  // owner initialized in customer way - changed to customer after deploy
  // wallet initialized as 2
  // otjer fields initialized in after deploy state
  // detailed:
  //   account 0 - old owner
  //   account 1 - current owner
  //   account 2 - wallet
  //   start - 0 - should change in current tests
  //   period - 5
  //   paused = not
  //
  //   work account - 3
  //

  it("investment time test: should not invest before start date", function() {
    var meta;
    var startDate = Math.floor(Date.now()/1000) + 60*60;
    var invested = web3.toWei(15, 'ether');
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(startDate, {from: accounts[1]});
    }).then(function(wallet) {
      return web3.eth.sendTransaction({ from: accounts[3], to: meta.address, value: invested, gas: 180000 })
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      assert.equal(0, total, "invested");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.total.call().then(function(total) {
          assert.equal(0, total, "invested");
        });
      } else {
        throw e;
      }
    });
  });

  it("investment time test: should not invest after start date", function() {
    var meta;
    var startDate = Math.floor(Date.now()/1000) - 10*24*60*60;
    var invested = web3.toWei(15, 'ether');
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(startDate, {from: accounts[1]});
    }).then(function(wallet) {
      return web3.eth.sendTransaction({ from: accounts[3], to: meta.address, value: invested, gas: 180000 })
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      assert.equal(0, total, "invested");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.total.call().then(function(total) {
          assert.equal(0, total, "invested");
        });
      } else {
        throw e;
      }
    });
  });

  //======================= integration test ==========================================//
  //
  // send from account 3 - 15
  // send from account 4 - 40
  // send from account 5 - 65
  //
  it("Integration test during invest time", function() {
    var meta;
    var gasNeeds = 140000;
    var startDate = Math.floor(Date.now()/1000) - 2*24*60*60;
    var invested1 = parseInt(web3.toWei(15, 'ether'));
    var invested2 = parseInt(web3.toWei(40, 'ether'));
    var invested3 = parseInt(web3.toWei(165, 'ether'));
    var invested4 = parseInt(web3.toWei(385, 'ether'));
    var walletBalance;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(startDate, {from: accounts[1]});
    }).then(function(wallet) {
      return web3.eth.getBalance(accounts[2]);
    }).then(function(balance) {
      walletBalance = parseInt(balance);
      return web3.eth.sendTransaction({ from: accounts[3], to: meta.address, value: invested1, gas: gasNeeds });
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      return assert.equal(invested1, total, "wrong total field");
    }).then(function() {
      return meta.totalInvestors.call();
    }).then(function(totalInvestors) {
      return assert.equal(1, totalInvestors, "wrong investors count");
    }).then(function() {
      return meta.investors.call(0);
    }).then(function(investor) {
      return assert.equal(accounts[3], investor, "wrong investor address");
    }).then(function() {
      return meta.balanceOf.call(accounts[3]);
    }).then(function(balance) {
      return assert.equal(invested1, balance, "wrong investor balance");
    }).then(function() {
      return web3.eth.getBalance(accounts[2]);
    }).then(function(balance) {
      console.log("Wallet old balance: " + walletBalance);
      console.log("Ivested: " + invested1);
      console.log("Wallet current balance: " + balance);
      console.log("Wallet current balance should be: " + (walletBalance + invested1));
      return assert.equal(walletBalance + invested1, balance, "wrong wallet balance");
    // 2
    }).then(function() {
      return web3.eth.sendTransaction({ from: accounts[4], to: meta.address, value: invested2, gas: gasNeeds });
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      return assert.equal(invested1 + invested2, total, "wrong total field after second invest");
    }).then(function() {
      return meta.totalInvestors.call();
    }).then(function(totalInvestors) {
      return assert.equal(2, totalInvestors, "wrong investors count - should be 2");
    }).then(function() {
      return meta.investors.call(1);
    }).then(function(investor) {
      return assert.equal(accounts[4], investor, "wrong second investor address");
    }).then(function() {
      return meta.balanceOf.call(accounts[4]);
    }).then(function(balance) {
      return assert.equal(invested2, balance, "wrong second investor balance");
    }).then(function() {
      return web3.eth.getBalance(accounts[2]);
    }).then(function(balance) {
      return assert.equal(walletBalance + invested1 + invested2, balance, "wrong wallet balance after second investor");
    // 3
    }).then(function() {
      return web3.eth.sendTransaction({ from: accounts[5], to: meta.address, value: invested3, gas: gasNeeds });
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      return assert.equal(invested1 + invested2 + invested3, total, "wrong total field after thrid invest");
    }).then(function() {
      return meta.totalInvestors.call();
    }).then(function(totalInvestors) {
      return assert.equal(3, totalInvestors, "wrong investors count - should be 3");
    }).then(function() {
      return meta.investors.call(2);
    }).then(function(investor) {
      return assert.equal(accounts[5], investor, "wrong thrid investor address");
    }).then(function() {
      return meta.balanceOf.call(accounts[5]);
    }).then(function(balance) {
      return assert.equal(invested3, balance, "wrong thrid investor balance");
    }).then(function() {
      return web3.eth.getBalance(accounts[2]);
    }).then(function(balance) {
      return assert.equal(walletBalance + invested1 + invested2 + invested3, balance, "wrong wallet balance after thrid investor");
    // 3x2
    }).then(function() {
      return web3.eth.sendTransaction({ from: accounts[5], to: meta.address, value: invested4, gas: gasNeeds });
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      return assert.equal(invested1 + invested2 + invested3 + invested4, total, "wrong total field after trid twice invest");
    }).then(function() {
      return meta.totalInvestors.call();
    }).then(function(totalInvestors) {
      return assert.equal(3, totalInvestors, "wrong investors count after twice invest - should be 3");
    }).then(function() {
      return meta.balanceOf.call(accounts[5]);
    }).then(function(balance) {
      return assert.equal(invested3 + invested4, balance, "wrong thrid investor balance afte twice invest");
    }).then(function() {
      return web3.eth.getBalance(accounts[2]);
    }).then(function(balance) {

      console.log("====================================================================");
      var invested = invested1 + invested2 + invested3 + invested4;
      console.log("Wallet old balance: " + walletBalance);
      console.log("Ivested: " + invested);
      console.log("Wallet current balance: " + balance);
      console.log("Wallet current balance should be: " + (walletBalance + invested));


      return assert.equal(walletBalance + invested1 + invested2 + invested3 + invested4, balance, "wrong wallet balance after thrid twice invest");
    });

  });*/


});
