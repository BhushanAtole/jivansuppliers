import React, { useState, useEffect } from "react";
import Truck from "../assets/white.png";


const Invoice = () => {
  const [date, setDate] = useState('');

  const handleDateChange = (index, value) => {
    let input = value;
    input = input.replace(/[^0-9/]/g, '');

    if (input.length === 2 && !input.includes('/')) {
      input += '/';
    } else if (input.length === 5 && input.split('/').length - 1 === 1) {
      input += '/';
    }

    handleInputChange(index, "date", input);
  };
  
  const [rows, setRows] = useState([
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
  ]);
  const [total, setTotal] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);
  const [advance, setAdvance] = useState(0);

  // Function to print the page
  const print = () => {
    window.print();
  };

  // Handle input changes for each row
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    if (field === "quantity" || field === "price") {
      const quantity = parseFloat(updatedRows[index].quantity) || 0;
      const price = parseFloat(updatedRows[index].price) || 0;
      updatedRows[index].amount = (quantity * price).toFixed(2);
    }
    setRows(updatedRows);
  };

  // Handle advance input change
  const handleAdvanceChange = (value) => {
    const advanceValue = parseFloat(value) || 0;
    setAdvance(advanceValue);
  };

  // Calculate total amount and pending balance whenever rows or advance change
  useEffect(() => {
    const totalAmount = rows.reduce(
      (acc, row) => acc + (parseFloat(row.amount) || 0),
      0
    );
    setTotal(totalAmount);
    setPendingBalance((totalAmount - advance).toFixed(2));
  }, [rows, advance]);

  // Function to format numbers as currency
  const formatCurrency = (num) => {
    return num.toLocaleString("en-US", { style: "currency", currency: "INR" });
  };

  return (
    <div className="max-w-4xl mx-auto p-2 bg-white shadow-lg rounded-lg ">
      {/* Print Button */}
      <div className="flex justify-end ">
        <button
          onClick={print}
          className="print-button px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Print
        </button>
      </div>

      {/* Invoice Container */}
      <div className="border-2 border-gray-300 p-2 rounded-lg">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center font-tiro justify-center">
          <img
            src={Truck}
            alt="Truck icon"
            className="h-32 sm:h-32 mr-0 sm:mr-4 mb-4 sm:mb-0"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold font-tiro text-red-500 max-sm:text-2xl mb-1">
            जीवन सप्लायर्स 
            </h1>
            <p className="text-sm mb-1 font-semibold">
              {/* A/P Wasunde Tal-Daund Dist-Pune Pin-412219 */}
              
              मु.पो. वासुंदे, ता. दौड, जि. पुणे ४१२२१९
            </p>
            <p className="text-sm mb-1 font-semibold">
              {/* Plaster Sand, Crush Sand 20mm, 10mm, 6mm, 40/60 */}
              {/* प्लास्टर सॅण्ड, क्रश सॅण्ड, २०mm, १०mm, ६mm, ४०/६० */}
              प्लास्टर सॅण्ड, क्रश सॅण्ड, २०mm, १०mm, ६mm, ४०/६० योग्य दरात मिळेल.
            </p>
            <div className="flex space-x-3">
              <p className="text-sm font-bold">प्रोप्रा दिपक जांबले </p>
              <p className="text-sm font-bold">फोन नं:-  <span className="font-sans">9763535050  / 9657545558 </span></p>
            </div>
          </div>
        </div>

        {/* Bank Info Section */}
        <div className="flex flex-col sm:flex-row justify-between text-lg mb-1 p-2 font-bold font-mono border border-gray-700 rounded-lg">
          <h3 className="mb-1 sm:mb-0">BANK AC NO : 924020049533836</h3>
          <h3>IFSC CODE : UTIB0000135</h3>
        </div>

        {/* Customer Name  */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center text-lg mb-2 p-1 bg-white border border-gray-700 rounded-lg space-y-2 sm:space-y-0 sm:space-x-4">
          <label htmlFor="customerName" className="w-full sm:w-1/5 font-semibold  ml-4">ग्राहकाचे नाव</label>

          {/* <label htmlFor="customerName" className="w-full sm:w-1/5">Customer Name</label> */}
          <input
            type="text"
            id="customerName"
            placeholder="Enter customer name"
            className="w-full sm:w-3/4 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
          />
        </div>


        {/* Table Container with Horizontal Scroll on Small Screens */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200 font-tiro">
              <tr>
                <th className="text-center border border-gray-600 p-2 text-sm md:text-base">
                अ.क्र
                </th>
                <th className="text-center border border-gray-600 p-2 text-sm md:text-base">
                तारीख
                </th>
                <th className="text-center border border-gray-600 p-2 text-sm md:text-base">
                मालाचा प्रकार 
                </th>
                <th className="text-center border border-gray-600 p-2 text-sm md:text-base">
                नग 
                </th>
                <th className="text-center border border-gray-600 p-2 text-sm md:text-base w-24">
                रेट 
                </th>
                <th className="text-center border border-gray-600 p-2 text-sm md:text-base w-24">
                रक्कम
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                    {index + 1}
                  </td>

                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base max-w-32 min-w-28">
                    {/* <input
                      type="date"
                      value={row.date || ""}
                      onChange={(e) =>
                        handleInputChange(index, "date", e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label={`Date for row ${index + 1}`}
                    /> */}
                    {/* <input
                    type="text"
                    className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                     */}

                    <input
                      type="text"
                      // placeholder="dd/mm/yyyy"
                      value={row.date}
                      onChange={(e) => handleDateChange(index, e.target.value)}
                      maxLength="10"
                      
                      className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
                      aria-label={`Date for row ${index + 1}`}
                    />

                  </td>

                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base min-w-40 ">
                    <input
                      type="text"
                      value={row.type || ""}
                      onChange={(e) =>
                        handleInputChange(index, "type", e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label={`Type of Material for row ${index + 1}`}
                      // placeholder="Material Type"
                    />
                  </td>
                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={row.quantity}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", e.target.value)
                      }
                      className="w-20 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                      aria-label={`Quantity for row ${index + 1}`}
                    />
                  </td>
                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={row.price}
                      onChange={(e) =>
                        handleInputChange(index, "price", e.target.value)
                      }
                      className="text-center w-20 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label={`Rate for row ${index + 1}`}
                    />
                  </td>
                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                    {row.amount ? formatCurrency(parseFloat(row.amount)) : "₹0.00"}
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-gray-200 font-semibold">
                <td
                  colSpan={5}
                  className="text-center border border-gray-600 p-2 text-sm md:text-base font-tiro"
                >
                  एकूण
                </td>
                <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                  {formatCurrency(total)}
                </td>
              </tr>

              {/* Advance Row */}
              <tr className="bg-gray-200 font-semibold">
                <td
                  colSpan={5}
                  className="text-center border border-gray-600 p-2 text-sm md:text-base font-tiro"
                >
                  ऍडव्हान्स
                </td>
                <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={advance}
                    onChange={(e) => handleAdvanceChange(e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    aria-label="Advance Payment"
                  />
                </td>
              </tr>

              {/* Pending Balance Row */}
              <tr className="bg-gray-200 font-semibold">
                <td
                  colSpan={5}
                  className="text-center border border-gray-600 p-2 text-sm md:text-base font-tiro"
                >
                  पेंडिंग बॅलन्स 
                </td>
                <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                  {formatCurrency(parseFloat(pendingBalance) || 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Optional Total Table (Visible on Medium and Larger Screens) */}
        <div className="flex justify-start mt-2 md:block">
          {/* <table className="text-sm">
            <tbody>
              <tr>
                <td className="pr-4 font-semibold">Total</td>
                <td>{formatCurrency(total)}</td>
              </tr>
              <tr>
                <td className="pr-4 font-semibold">Advance</td>
                <td>{formatCurrency(advance)}</td>
              </tr>
              <tr>
                <td className="pr-4 font-semibold">Pending Balance</td>
                <td>{formatCurrency(parseFloat(pendingBalance) || 0)}</td>
              </tr>
            </tbody>
          </table> */}

          <div className="flex flex-row justify-end">
            <div className="flex flex-col text-left mr-2">
              <h3>एकूण</h3>
              <h3>ऍडव्हान्स</h3>
              <h3>पेंडिंग बॅलन्स </h3>
            </div>
            <div className="flex flex-col">
              <h3>{formatCurrency(total)}</h3>
              <h3>{formatCurrency(advance)}</h3>
              <h3>{formatCurrency(parseFloat(pendingBalance) || 0)}</h3>

            </div>
          </div>



        </div>

        {/* Signatory Section */}
        <div className="mt-0 flex justify-end ">
          <div className="text-center">
            <div className="w-32 h-1 border-b border-black "></div>
            <p className="text-sm">Authorized Signatory</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
