using Homework5_10.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Homework5_10.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private string _connectionString;

        public HomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new ReactPeopleRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("add")]
        public void AddPerson(Person person)
        {
            var repo = new ReactPeopleRepository(_connectionString);
            repo.Add(person);
        }

        [HttpPost]
        [Route("update")]
        public void UpdatePerson(Person person)
        {
            var repo = new ReactPeopleRepository(_connectionString);
            repo.Edit(person);

        }

        [HttpPost]
        [Route("delete")]
        public void DeletePeople(List<int> ids)
        {
            var repo = new ReactPeopleRepository(_connectionString);
            repo.Delete(ids);
        }
    }
}

