import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import GooglePayButton from "@google-pay/button-react";
import "./transaction.css";

function Form() {
  return (
    <FormStyled>
      <form>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
        />

        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="amount"
          min="0"
          defaultValue={0}
        />
      </form>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    margin-bottom: 20px;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

function Transaction() {
  const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } =
    useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);
  return (
    <TransactionStyled>
      <InnerLayout>
        <h1>Transaction</h1>
        <div>
          <div>
            <Form />
            <div style={{ display: "flex", gap: "1rem" }}>
              <GooglePayButton
                style={{ marginLeft: "300px" }}
                environment="TEST"
                buttonType="pay"
                paymentRequest={{
                  apiVersion: 2,
                  apiVersionMinor: 0,
                  allowedPaymentMethods: [
                    {
                      type: "CARD",
                      parameters: {
                        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                        allowedCardNetworks: [
                          "AMEX",
                          "DISCOVER",
                          "INTERAC",
                          "JCB",
                          "MASTERCARD",
                          "VISA",
                        ],
                      },
                      tokenizationSpecification: {
                        type: "PAYMENT_GATEWAY",
                        parameters: {
                          gateway: "example",
                          gatewayMerchantId: "exampleGatewayMerchantId",
                        },
                      },
                    },
                  ],
                  merchantInfo: {
                    merchantId: "12345678901234567890",
                    merchantName: "Demo Merchant",
                  },
                  transactionInfo: {
                    totalPriceStatus: "FINAL",
                    totalPriceLabel: "Total",
                    totalPrice: "100.00",
                    currencyCode: "INR",
                    countryCode: "IN",
                  },
                }}
                onLoadPaymentData={(paymentRequest) => {
                  console.log("load payment data", paymentRequest);
                }}
              />
              <button
                style={{ width: "100px", height: "40px", borderRadius: "9px" }}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </InnerLayout>
    </TransactionStyled>
  );
}

const TransactionStyled = styled.div`
  display: flex;
  overflow: auto;
`;

export default Transaction;
