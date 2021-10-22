using ControleFinanceiro.BLL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.API.Controllers.Validacoes
{
    public class CategoriaValidator : AbstractValidator<Categoria>
    {
        public CategoriaValidator()
        {
            RuleFor(c => c.Nome)
                .NotNull().WithMessage("Preencha o nome")
                .NotEmpty().WithMessage("Preencha o nome")
                .MinimumLength(6).WithMessage("Use mais caracteres")
                .MaximumLength(50).WithMessage("Use menos caracteres");

            RuleFor(c => c.Icone)
                .NotNull().WithMessage("Preencha o Icone")
                .NotEmpty().WithMessage("Preencha o Icone")
                .MinimumLength(1).WithMessage("Use mais caracteres")
                .MaximumLength(15).WithMessage("Use menos caracteres");

            RuleFor(c => c.tipoId)
                .NotNull().WithMessage("Escolha o tipo da categoria")
                .NotEmpty().WithMessage("Escolha o tipo da categoria");
        }

    }
}
