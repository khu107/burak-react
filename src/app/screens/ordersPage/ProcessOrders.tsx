import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import moment from "moment";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";

const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);

  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.erro2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };
      const confirmation = window.confirm("Have you received your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        // => PROCESS ORDER
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="2">
      <Stack>
        {processOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className="order-main-box">
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];

                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className="orders-name-price">
                      <div
                        style={{
                          display: "flex",
                          gap: 20,
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={imagePath}
                          className="order-dish-img"
                          alt=""
                          style={{ width: 50, height: 50, borderRadius: "50%" }}
                        />
                        <p className="title-dish">{product.productName}</p>
                      </div>
                      <Box className="price-box">
                        <p>${item.itemPrice}</p>
                        <img src="/icons/close.svg" alt="" />
                        <p>{item.itemQuantity}</p>
                        <img src="/icons/pause.svg" alt="" />
                        <p>${item.itemQuantity * item.itemPrice}</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total-price-box">
                <Box className="box-total">
                  <p>Product price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img src="/icons/plus.svg" alt="" />
                  <p>Delivery cost</p>
                  <p>${order.orderDelivery}</p>
                  <img
                    src="/icons/pause.svg"
                    alt=""
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
                <p className="data-compl">
                  {moment().format("YY-MM-DD HH:mm")}
                </p>
                <Button
                  value={order._id}
                  onClick={finishOrderHandler}
                  variant="contained"
                  className="verify-button"
                >
                  VERIFY TO FULFIL
                </Button>
              </Box>
            </Box>
          );
        })}

        {!processOrders ||
          (processOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src="/icons/noimage-list.svg"
                alt=""
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
