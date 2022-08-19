"use strict";

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(
    
        function(responseBody){
            if(responseBody.success){
                location.reload();;   
            } 
        }
    )
}

// const profileWidget = new ProfileWidget();

ApiConnector.current(
    function(responseBody){
        if(responseBody.success){
            ProfileWidget.showProfile(responseBody.data);
        }
    }
)


const ratesBoard = new RatesBoard();

    function rateRequest(){
        ApiConnector.getStocks(
           function(responseBody){   
                if(responseBody.success){
                    ratesBoard.clearTable();
                    ratesBoard.fillTable(responseBody.data);
                } 
            }
        )
    }
rateRequest();
setInterval(() => rateRequest(), 60000);


const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, 
        function(responseBody){
            if(responseBody.success){
                ProfileWidget.showProfile(responseBody.data);
                moneyManager.setMessage(true, "Баланс успешно пополнен");

               // location.reload()
            }  else {
                moneyManager.setMessage(false, responseBody.error);
            }
        }
    )
}


moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney( data,
        function(responseBody){
            if(responseBody.success){
                ProfileWidget.showProfile(responseBody.data);
                moneyManager.setMessage(true, "Денежки успешно сконвертировались");

               // location.reload()
            }  else {
                moneyManager.setMessage(false, responseBody.error);
            }
        }
        
    )
}


moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney( data, 
        function(responseBody){
            if(responseBody.success){
                ProfileWidget.showProfile(responseBody.data);
                moneyManager.setMessage(true, "Перевод успешно отправлен");

            }  else {
                moneyManager.setMessage(false, responseBody.error);
            }
        } 
    )
}


const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(
    function(responseBody){
        if(responseBody.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(responseBody.data);
            moneyManager.updateUsersList(responseBody.data);
        }
    }
)

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites (data,
        function(responseBody){
            if(responseBody.success){
                favoritesWidget.clearTable();
                favoritesWidget.fillTable(responseBody.data);
                moneyManager.updateUsersList(responseBody.data);
                favoritesWidget.setMessage(true, "Пользователь успешно добавлен");
            } else {
                favoritesWidget.setMessage(false, responseBody.error);
            }
        }
    )
}


favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data,
        function(responseBody){
            if(responseBody.success){
                favoritesWidget.clearTable();
                favoritesWidget.fillTable(responseBody.data);
                moneyManager.updateUsersList(responseBody.data);
                favoritesWidget.setMessage(true, "Пользователь успешно удален");
            } else {
                favoritesWidget.setMessage(false, responseBody.error);
            }
        }
        
    )
}