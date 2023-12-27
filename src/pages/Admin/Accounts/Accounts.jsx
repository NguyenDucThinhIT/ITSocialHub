import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CIcon from "@coreui/icons-react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {  cilSearch } from "@coreui/icons";
import { getAccount, deleteAccount ,statusAccount} from "@/services/accounts.api";
import useQueryConfigAcc from "@/hooks/useQueryConfigAcc";
import "./style.css";
import AccountItem from "./AccountItem";

function Accounts() {
  const queryConfig = useQueryConfigAcc();
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState([]);
  const [searchData, setSearchData] = useState({
    role: 0,
    info: "",
  });
  const [data, setData] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const fetchData = async () => {
    setIsLoading(false);
    try {
      const res = await getAccount();
      setInitialData(res.data);
      setData(res.data);
    } catch (error) {
      // Xử lý lỗi ở đây nếu cần
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setNoResults(data.length === 0);
  }, [data]);
  const deleteAccountMutation = useMutation({
    mutationFn: (body) => deleteAccount(body),
  });
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 2 : 1;
    try {
      await statusAccount(id, { status: newStatus });
      Swal.fire({
        icon: "success",
        title: t("jobPage.successfully"),
        //text: t("admin.account.statusUpdateRes"),
      });
      fetchData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("jobPage.failed"),
        text: error.response?.data?.error || "",
      });
    }
  };
  

  const handleDeleteAccount = (id) => {
    deleteAccountMutation.mutate([id], {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: t("jobPage.successfully"),
          text: t("admin.account.deleteRes"),
        });
        fetchData();
      },
      onError: (error) => {
        Swal.fire({
          icon: "error",
          title: t("jobPage.failed"),
          text: error.response?.data?.error || "",
        });
      },
    });
  };
  const checkIncluded = (str1, str2) => {
    if (str2 === "") return true;
    const includesSubstring = str1.toLowerCase().includes(str2.toLowerCase());
    return includesSubstring;
  };
  const getData = () => {
    const filteredUsers = initialData.filter(
      (user) =>
        (user.role === searchData.role || searchData.role === 0) &&
        (checkIncluded(user.first_name, searchData.info) ||
          checkIncluded(user.last_name, searchData.info) ||
          checkIncluded(user.email, searchData.info))
    );
    setData(filteredUsers);
    setNoResults(filteredUsers.length === 0);
  };
  const handleRole = (e) => {
    setSearchData({ ...searchData, role: parseInt(e.target.value) });
  };
  return (
    <Container className="d-flex flex-column pt-5 bg-white">
      <Row>
        <Form>
          <Row>
            <Form.Group as={Col} xs={4} md={3}>
              <Form.Select
                onChange={handleRole}
                value={searchData.role}
                className="search-height"
              >
                <option value="0">{t("jobPage.all")}</option>
                <option value="2">{t("admin.account.recruiter")}</option>
                <option value="1">{t("admin.account.candidate")}</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} xs={4} md={6}>
              <Form.Control
                title={searchData.info}
                onChange={(e) =>
                  setSearchData({ ...searchData, info: e.target.value })
                }
                className="search-height"
                type="text"
                placeholder={t("admin.account.searchUsername")}
              />
            </Form.Group>

            <Col xs={4} md={3}>
              <Button
                type="button"
                onClick={getData}
                className="search-height d-flex align-items-center justify-content-center w-100"
              >
                <CIcon icon={cilSearch} size="lg" className="mx-2" />
                {t("jobPage.searchButton")}
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
      <Table responsive="lg">
        <thead>
          <tr className="bg-white" style={{ verticalAlign: "middle" }}>
            <th>ID</th>
            <th>{t("admin.account.fullName")}</th>
            <th>Email</th>
            <th>{t("admin.account.role")}</th>
            <th>{t("sort.status")}</th>
            <th>{t("admin.account.action")}</th>
          </tr>
        </thead>
        {initialData && initialData.length > 0 ? (
          <tbody>
            {data.map((acc, index) => (
              <AccountItem
                index={index + 10 * (queryConfig.page - 1)}
                key={acc.id}
                account={acc}
                email={acc.email}
                deleteaccount={handleDeleteAccount}
                toggleStatus={handleToggleStatus}
              />
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                {noResults ? (
                  <>
                    <div className="no-results-container">
                      <img
                        src="/assets/images/notFound.png"
                        alt="No Results"
                        className="no-results-image"
                      />
                      <p className="no-results-message">
                        {t("interviewer.interviewList.notFound")}
                      </p>
                    </div>
                  </>
                ) : (
                  <h2>{t("admin.account.noAccounts")}</h2>
                )}
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </Container>
  );
}

export default Accounts;
